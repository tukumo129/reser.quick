<?php

namespace App\Services;

use App\Enums\OpenTimeType;
use App\Models\Contract;
use App\Models\Reserve;
use App\Models\Setting;
use App\Repositories\ReserveRepository;
use Carbon\CarbonPeriod;
use Illuminate\Support\Carbon;

class ReserveService
{
    protected ReserveRepository $reserveRepository;

    public function __construct(
        ReserveRepository $reserveRepository
    ) {
        $this->reserveRepository = $reserveRepository;
    }

    /**
     * @param int $contractId
     * @param int $reserveId
     * @return Reserve
     */
    public function getReserve(int $contractId, int $reserveId): Reserve
    {
        return $this->reserveRepository->get($contractId, $reserveId);
    }

    /**
     * @param int $contractId
     * @param array<string, string>|null $sorts
     * @param int|null $page
     * @param int|null $limit
     * @return array<string, mixed>
     */
    public function getReserves(int $contractId, ?array $sorts, ?int $page, ?int $limit): array
    {
        $criteria = ['contract_id' => $contractId];

        if($page && $limit) {
            return $this->reserveRepository->getWithPagination($criteria, $sorts, $page, $limit);
        }

        $reserves = $this->reserveRepository->getBy($criteria);
        return [
            'reserves' => $reserves,
            'pagination' => null,
        ];
    }

    /**
     * @param array<string, mixed> $reserveData
     * @return Reserve
     */
    public function createReserve(array $reserveData): Reserve
    {
        return $this->reserveRepository->create($reserveData);
    }

    /**
     * @param int $contractId
     * @param int $reserveId
     * @param array<string, mixed> $reserveData
     * @return Reserve
     */
    public function updateReserve(int $contractId, int $reserveId, array $reserveData): Reserve
    {
        return $this->reserveRepository->update($contractId, $reserveId, $reserveData);
    }

    /**
     * @param int $contractId
     * @param int $reserveId
     * @return void
     */
    public function deleteReserve(int $contractId, int $reserveId): void
    {
        $this->reserveRepository->delete($contractId, $reserveId);
    }

    /**
     * 設定から予約できる日時を取得し、実際に予約が可能かを判定るする
     * @param Contract $contract
     * @param string $date
     * @return array<string, string>
     */
    public function getReserveAvailableDates(Contract $contract, string $date): array
    {
        $setting = $contract->setting;
        $reserveDateTimes = [];

        $reserveDateTimes = $this->getReserveDateTimes($setting, $date);
        foreach($reserveDateTimes as $reserveDateTime) {
            $availableDateTimeCount = $this->reserveRepository->getByStartDateTime($contract->id, $reserveDateTime['date'], $reserveDateTime['start_time'])->count();
            $availableDates[] = [
                'date' => $reserveDateTime['date'],
                'start_time' => $reserveDateTime['start_time'],
                'end_time' => $reserveDateTime['end_time'],
                'available' => $availableDateTimeCount < $setting->max_available_reserve,
            ];
        }

        return collect($availableDates)->groupBy('date')->map(function ($groups) {
            return [
                'date' => $groups[0]['date'],
                'available' => $groups->contains('available', true),
            ];
        })->values()->toArray();
    }

    /**
     * 設定から予約できる日時を取得
     * @param Contract $contract
     * @param string $date
     * @return array<string, string>
     */
    public function getReserveDateTimes(Setting $setting, string $date): array
    {
        // 対象の月のカレンダー取得
        $targetDate = Carbon::parse($date);
        $calender = CarbonPeriod::create($targetDate->copy()->startOfMonth(), $targetDate->copy()->endOfMonth())->toArray();

        // 有効な曜日だけに絞り込み
        $reserveSlotTime = $setting->reserve_slot_time;
        $openTimes = $setting->openTimes;
        $weekArray = [];
        $dayArray = [];
        $unsetWeekDates = [];

        foreach($calender as $date) {
            // 週当たりの設定から対象日付を追加
            $weekOpenTime = $openTimes->where('type', OpenTimeType::WEEK)->where('week', $date->dayOfWeek)->first();
            if($weekOpenTime) {
                $weekEndTime = Carbon::parse($weekOpenTime->end_time)->subMinutes($reserveSlotTime)->format('H:i');
                foreach(CarbonPeriod::create($weekOpenTime->start_time, "{$reserveSlotTime} minutes", $weekEndTime) as $day) {
                    $weekArray[] = [
                        'date' => $date->format('Y-m-d'),
                        'start_time' => $day->format('H:i'),
                        'end_time' => $day->copy()->addMinutes($reserveSlotTime)->format('H:i'),
                    ];
                }
            }
        }

        // 日付当たりの設定から対象日付を追加
        $dayOpenTimes = $openTimes->where('type', OpenTimeType::DAY);
        foreach($dayOpenTimes as $dayOpenTime) {
            $openDate = Carbon::parse($dayOpenTime->date);
            if(!$openDate->isSameMonth($targetDate)) {
                // 指定した月以外はスキップ
                continue;
            }
            // 日付での指定がある場合はweekの設定を消す
            $unsetWeekDates[] = $dayOpenTime->date;

            if($dayOpenTime->start_time === null || $dayOpenTime->start_time === $dayOpenTime->end_time) {
                // 開始と終了が同一時刻または開始時間がnullの場合営業なし
                continue;
            } else {
                $weekEndTime = Carbon::parse($dayOpenTime->end_time)->subMinutes($reserveSlotTime)->format('H:i');
                foreach(CarbonPeriod::create($dayOpenTime->start_time, "{$reserveSlotTime} minutes", $weekEndTime) as $day) {
                    $dayArray[] = [
                        'date' => $openDate->format('Y-m-d'),
                        'start_time' => $day->format('H:i'),
                        'end_time' => $day->copy()->addMinutes($reserveSlotTime)->format('H:i'),
                    ];
                }
            }
        }

        $weekAvailableDates = array_filter($weekArray, function ($item) use ($unsetWeekDates) {
            return !in_array($item['date'], $unsetWeekDates);
        });
        return array_merge($weekAvailableDates, $dayArray);
    }
}
