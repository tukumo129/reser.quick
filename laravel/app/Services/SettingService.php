<?php

namespace App\Services;

use App\Models\ReserveSetting;
use App\Models\StoreSetting;
use App\Repositories\DayOpenTimeRepository;
use App\Repositories\ReserveSettingRepository;
use App\Repositories\StoreSettingRepository;
use App\Repositories\WeekOpenTimeRepository;

class SettingService
{
    protected StoreSettingRepository $storeSettingRepository;
    protected DayOpenTimeRepository $dayOpenTimeRepository;
    protected WeekOpenTimeRepository $weekOpenTimeRepository;
    protected ReserveSettingRepository $reserveSettingRepository;

    public function __construct(
        StoreSettingRepository $storeSettingRepository,
        DayOpenTimeRepository $dayOpenTimeRepository,
        WeekOpenTimeRepository $weekOpenTimeRepository,
        ReserveSettingRepository $reserveSettingRepository
    ) {
        $this->storeSettingRepository = $storeSettingRepository;
        $this->dayOpenTimeRepository = $dayOpenTimeRepository;
        $this->weekOpenTimeRepository = $weekOpenTimeRepository;
        $this->reserveSettingRepository = $reserveSettingRepository;
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $storeSettingData
     * @return StoreSetting
     */
    public function updateOrCreateStoreSettings(int $contractId, array $storeSettingData): StoreSetting
    {
        $storeSettingData['store_name'] = $storeSettingData['store_name'] ?? null;
        $storeSetting = $this->storeSettingRepository->updateOrCreate($contractId, $storeSettingData);

        $dayOpenTimesData = $storeSettingData['day_open_times'] ?? null;
        $dayOpenTimeIds = collect($dayOpenTimesData)->pluck('id')->unique()->toArray();
        $this->dayOpenTimeRepository->cleanupRemove($storeSetting->id, $dayOpenTimeIds);
        if($dayOpenTimesData) {
            foreach($dayOpenTimesData as $dayOpenTimeData) {
                $this->dayOpenTimeRepository->updateOrCreate($storeSetting->id, $dayOpenTimeData);
            }
        }

        $weekOpenTimesData = $storeSettingData['week_open_times'] ?? null;
        $weekOpenTimeIds = collect($weekOpenTimesData)->pluck('id')->unique()->toArray();
        $this->weekOpenTimeRepository->cleanupRemove($storeSetting->id, $weekOpenTimeIds);
        if($weekOpenTimesData) {
            foreach($weekOpenTimesData as $weekOpenTimeData) {
                $this->weekOpenTimeRepository->updateOrCreate($storeSetting->id, $weekOpenTimeData);
            }
        }

        return $storeSetting;
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $reserveSettingData
     * @return ReserveSetting
     */
    public function updateOrCreateReserveSettings(int $contractId, array $reserveSettingData): ReserveSetting
    {
        return $this->reserveSettingRepository->updateOrCreate($contractId, $reserveSettingData);
    }
}
