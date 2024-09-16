<?php

namespace App\Services;

use App\Models\StoreSetting;
use App\Repositories\DayOpenTimeRepository;
use App\Repositories\StoreSettingRepository;
use App\Repositories\WeekOpenTimeRepository;

class SettingService
{
    protected StoreSettingRepository $storeSettingRepository;
    protected DayOpenTimeRepository $dayOpenTimeRepository;
    protected WeekOpenTimeRepository $weekOpenTimeRepository;
    public function __construct(
        StoreSettingRepository $storeSettingRepository,
        DayOpenTimeRepository $dayOpenTimeRepository,
        WeekOpenTimeRepository $weekOpenTimeRepository
    ) {
        $this->storeSettingRepository = $storeSettingRepository;
        $this->dayOpenTimeRepository = $dayOpenTimeRepository;
        $this->weekOpenTimeRepository = $weekOpenTimeRepository;
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $settingData
     * @return StoreSetting
     */
    public function updateOrCreateStoreSettings(int $contractId, array $settingData): StoreSetting
    {
        $storeSettingData['store_name'] = $settingData['store_name'] ?? null;
        $storeSetting = $this->storeSettingRepository->updateOrCreate($contractId, $storeSettingData);

        $dayOpenTimesData = $settingData['day_open_times'] ?? null;
        $dayOpenTimeIds = collect($dayOpenTimesData)->pluck('id')->unique()->toArray();
        $this->dayOpenTimeRepository->cleanupRemove($storeSetting->id, $dayOpenTimeIds);
        if($dayOpenTimesData) {
            foreach($dayOpenTimesData as $dayOpenTimeData) {
                $this->dayOpenTimeRepository->updateOrCreate($storeSetting->id, $dayOpenTimeData);
            }
        }

        $weekOpenTimesData = $settingData['week_open_times'] ?? null;
        $weekOpenTimeIds = collect($weekOpenTimesData)->pluck('id')->unique()->toArray();
        $this->weekOpenTimeRepository->cleanupRemove($storeSetting->id, $weekOpenTimeIds);
        if($weekOpenTimesData) {
            foreach($weekOpenTimesData as $weekOpenTimeData) {
                $this->weekOpenTimeRepository->updateOrCreate($storeSetting->id, $weekOpenTimeData);
            }
        }

        return $storeSetting;
    }
}
