<?php

namespace App\Services;

use App\Enums\OpenTimeType;
use App\Enums\ReserveCountPeriod;
use App\Enums\ReserveCountType;
use App\Enums\ReserveStatus;
use App\Enums\SequenceKey;
use App\Models\Contract;
use App\Models\OpenTime;
use App\Models\Reserve;
use App\Models\Setting;
use App\Repositories\ReserveRepository;
use Carbon\CarbonPeriod;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ReserveService
{
    protected ReserveRepository $reserveRepository;

    public function __construct(
        ReserveRepository $reserveRepository
    ) {
        $this->reserveRepository = $reserveRepository;
    }

    public function getReserve(int $contractId, int $reserveId): Reserve
    {
        return $this->reserveRepository->get($contractId, $reserveId);
    }

    /**
     * @param  array<string, string>  $criteria
     * @param  array<string, string>  $periodCriteria
     * @param  array<string, string>  $sorts
     * @return array<string, mixed>
     */
    public function getReserves(
        int $contractId,
        array $criteria,
        array $periodCriteria,
        ?string $searchKey,
        array $sorts,
        ?int $page,
        ?int $limit
    ): array {
        $criteria['contract_id'] = $contractId;

        return $this->reserveRepository->getWithPagination($criteria, $periodCriteria, $searchKey, $sorts, $page, $limit);
    }

    /**
     * @return array<int, mixed>
     */
    public function getReservesCount(
        int $contractId,
        int $countType,
        string $dateTime,
        int $period
    ): array {
        $criteria['contract_id'] = $contractId;
        [$startDateTime, $endDateTime] = $this->getPeriod(Carbon::parse($dateTime), $period);

        $periodText = '';
        $addHours = 0;
        if ($countType === ReserveCountType::DAILY) {
            $periodText = '1 days';
            $addHours = 24;
        } elseif ($countType === ReserveCountType::HOURLY && $period === ReserveCountPeriod::DAY) {
            $periodText = '1 hours';
            $addHours = 1;
        }
        $datePeriods = CarbonPeriod::create($startDateTime, $periodText, $endDateTime);
        $result = [];
        foreach ($datePeriods as $datePeriod) {
            $periodCriteria = [
                'start_date_time' => $datePeriod->copy()->format('Y-m-d H:i'),
                'end_date_time' => $datePeriod->copy()->addHours($addHours)->subSeconds(1)->format('Y-m-d H:i'),
            ];
            $result[] = [
                'dateTime' => $datePeriod->format('Y-m-d H:i'),
                'count' => $this->reserveRepository->getCount($criteria, $periodCriteria),
            ];
        }

        return $result;
    }

    private function getPeriod(Carbon $dateTime, int $period): array
    {
        switch ($period) {
            case ReserveCountPeriod::DAY:
                return [$dateTime->copy()->startOfDay(), $dateTime->copy()->endOfDay()];
            case ReserveCountPeriod::WEEK:
                return [$dateTime->copy()->startOfWeek(), $dateTime->copy()->endOfWeek()];
            case ReserveCountPeriod::MONTH:
                return [$dateTime->copy()->startOfMonth(), $dateTime->copy()->endOfMonth()];
            default:
                throw new Exception('InvalidPeriod');
        }
    }

    /**
     * @param  array<string, mixed>  $reserveData
     */
    public function createReserve(Contract $contract, array $reserveData): Reserve
    {
        $reserveData['uuid'] = Str::uuid()->toString();
        if (! isset($reserveData['status'])) {
            // 作成時にstatusが指定されていない場合はNO_COMPLETEを設定
            $reserveData['status'] = ReserveStatus::NO_COMPLETE;
        }
        $reserveData['reserve_id'] = 'R'.str_pad((string) $contract->getNextSequence(SequenceKey::Reserve), 8, '0', STR_PAD_LEFT);

        return $this->reserveRepository->create($reserveData);
    }

    /**
     * @param  array<string, mixed>  $reserveData
     */
    public function updateReserve(int $contractId, int $reserveId, array $reserveData): Reserve
    {
        return $this->reserveRepository->update($contractId, $reserveId, $reserveData);
    }

    public function deleteReserve(int $contractId, int $reserveId): void
    {
        $this->reserveRepository->delete($contractId, $reserveId);
    }

    /**
     * 設定から予約できる日時を取得し、実際に予約が可能かを判定るする
     *
     * @return array<string, string>
     */
    public function getMonthReserveAvailableDates(Contract $contract, string $date): array
    {
        /** @var Setting $setting */
        $setting = $contract->setting;
        $availableDates = [];

        $targetDate = Carbon::parse($date);
        $reserveDateTimes = $this->getReserveDateTimes($setting, $targetDate->copy()->startOfMonth(), $targetDate->copy()->endOfMonth());
        foreach ($reserveDateTimes as $reserveDateTime) {
            $availableDateTimeCount = $this->reserveRepository->getByStartDateTime($contract->id, $reserveDateTime['date'], $reserveDateTime['start_time'])->count();
            $availableDates[] = [
                'date' => $reserveDateTime['date'],
                'start_time' => $reserveDateTime['start_time'],
                'end_time' => $reserveDateTime['end_time'],
                'available' => $setting->max_available_reserve ? $availableDateTimeCount < $setting->max_available_reserve : true,
            ];
        }

        return collect($availableDates)->isEmpty() ? [] :
            collect($availableDates)->groupBy('date')->map(function ($groups) {
                return [
                    'date' => $groups[0]['date'],
                    'available' => $groups->contains('available', true),
                ];
            })->values()->toArray();
    }

    /**
     * 指定日付の予約可能な時間を取得
     *
     * @return array<int, mixed>
     */
    public function getReserveAvailableTimes(Contract $contract, string $date): array
    {
        /** @var Setting $setting */
        $setting = $contract->setting;
        $availableDates = [];

        $targetDate = Carbon::parse($date);
        $reserveDateTimes = $this->getReserveDateTimes($setting, $targetDate, $targetDate);
        foreach ($reserveDateTimes as $reserveDateTime) {
            $availableDateTimeCount = $this->reserveRepository->getByStartDateTime($contract->id, $reserveDateTime['date'], $reserveDateTime['start_time'])->count();
            $availableDates[] = [
                'date' => $reserveDateTime['date'],
                'startTime' => $reserveDateTime['start_time'],
                'endTime' => $reserveDateTime['end_time'],
                'available' => $setting->max_available_reserve ? $availableDateTimeCount < $setting->max_available_reserve : true,
            ];
        }

        return $availableDates;
    }

    /**
     * 指定した日付間の設定から予約できる日時を取得
     *
     * @return array<int, mixed>
     */
    public function getReserveDateTimes(Setting $setting, Carbon $startDate, Carbon $endDate): array
    {
        // 対象の月のカレンダー取得
        $calender = CarbonPeriod::create($startDate, $endDate)->toArray();
        // 有効な曜日だけに絞り込み
        $reserveSlotTime = (int) $setting->reserve_slot_time;
        $openTimes = $setting->openTimes;
        $weekArray = [];
        $dayArray = [];
        $unsetWeekDates = [];

        foreach ($calender as $date) {
            // 週当たりの設定から対象日付を追加
            /** @var Collection<OpenTime> $weekOpenTimes */
            $weekOpenTimes = $openTimes->where('type', OpenTimeType::WEEK)->where('week', $date->dayOfWeek);
            foreach ($weekOpenTimes as $weekOpenTime) {
                $weekEndTime = Carbon::parse($weekOpenTime->end_time)->subMinutes($reserveSlotTime)->format('H:i');
                foreach (CarbonPeriod::create($weekOpenTime->start_time, "{$reserveSlotTime} minutes", $weekEndTime) as $day) {
                    $weekArray[] = [
                        'date' => $date->format('Y-m-d'),
                        'start_time' => $day->format('H:i'),
                        'end_time' => $day->copy()->addMinutes($reserveSlotTime)->format('H:i'),
                    ];
                }
            }
        }

        // 日付当たりの設定から対象日付を追加
        /** @var Collection<OpenTime> $dayOpenTimes */
        $dayOpenTimes = $openTimes->where('type', OpenTimeType::DAY);
        foreach ($dayOpenTimes as $dayOpenTime) {
            $openDate = Carbon::parse($dayOpenTime->date);
            if (! $openDate->between($startDate, $endDate)) {
                // 指定した日付の区間外の場合スキップ
                continue;
            }
            // 日付での指定がある場合はweekの設定を消す
            $unsetWeekDates[] = $dayOpenTime->date;

            if ($dayOpenTime->start_time === null || $dayOpenTime->start_time === $dayOpenTime->end_time) {
                // 開始と終了が同一時刻または開始時間がnullの場合営業なし
                continue;
            } else {
                $weekEndTime = Carbon::parse($dayOpenTime->end_time)->subMinutes($reserveSlotTime)->format('H:i');
                foreach (CarbonPeriod::create($dayOpenTime->start_time, "{$reserveSlotTime} minutes", $weekEndTime) as $day) {
                    $dayArray[] = [
                        'date' => $openDate->format('Y-m-d'),
                        'start_time' => $day->format('H:i'),
                        'end_time' => $day->copy()->addMinutes($reserveSlotTime)->format('H:i'),
                    ];
                }
            }
        }

        $weekAvailableDates = array_filter($weekArray, function ($item) use ($unsetWeekDates) {
            return ! in_array($item['date'], $unsetWeekDates);
        });

        return array_merge($weekAvailableDates, $dayArray);
    }
}
