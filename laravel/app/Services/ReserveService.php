<?php

namespace App\Services;

use App\Models\Contract;
use App\Models\Reserve;
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
        return $this->reserveRepository->find($contractId, $reserveId);
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
            return $this->reserveRepository->findWithPagination($criteria, $sorts, $page, $limit);
        }

        $reserves = $this->reserveRepository->findBy($criteria);
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
     * @param Contract $contract
     * @param string $date
     * @return array<string>
     */
    public function getReserveAvailableDates(Contract $contract, string $date): array
    {
        // 対象の月のカレンダー取得
        $storeSetting = $contract->storeSetting;
        $targetDate = Carbon::parse($date);
        $calender = CarbonPeriod::create($targetDate->copy()->startOfMonth(), $targetDate->copy()->endOfMonth())->toArray();

        // 有効な曜日だけに絞り込み
        $weekOpenTimes = $storeSetting->weekOpenTimes;
        $weeks = $weekOpenTimes->pluck('week')->toArray();
        $weekOpenDates = array_filter($calender, function($date) use ($weeks) {
            return in_array($date->dayOfWeek, $weeks);
        });
        $availableDates = array_map(function($date) {
            return $date->format('Y-m-d');
        }, $weekOpenDates);

        // 日付当たりの設定から対象日付を追加
        $dayOpenTimes = $storeSetting->dayOpenTimes;
        $unsetValues = [];
        foreach($dayOpenTimes as $dayOpenTime) {
            $openDate = Carbon::parse($dayOpenTime->date);
            if($dayOpenTime->open_time === $dayOpenTime->close_time) {
                // 開始と終了が同一時刻の場合営業なし
                $unsetValues[] = $dayOpenTime->date;
            } elseif($openDate->isSameMonth($targetDate)) {
                $availableDates[] = $dayOpenTime->date;
            }
        }
        return array_values(array_diff($availableDates, $unsetValues));
    }
}
