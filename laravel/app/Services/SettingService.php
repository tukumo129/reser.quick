<?php

namespace App\Services;

use App\Models\Setting;
use App\Repositories\OpenTimeRepository;
use App\Repositories\SettingRepository;

class SettingService
{
    protected SettingRepository $settingRepository;
    protected OpenTimeRepository $openTimeRepository;

    public function __construct(
        SettingRepository $settingRepository,
        OpenTimeRepository $openTimeRepository
    ) {
        $this->settingRepository = $settingRepository;
        $this->openTimeRepository = $openTimeRepository;
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $settingData
     * @return Setting
     */
    public function updateOrCreateSettings(int $contractId, array $settingData): Setting
    {
        $setting = $this->settingRepository->updateOrCreate($contractId, $settingData);

        $openTimesData = $settingData['open_times'] ?? [];
        $openTimeIds = collect($openTimesData)->pluck('id')->unique()->toArray();
        $this->openTimeRepository->cleanupDelete($setting->id, $openTimeIds);
        if($openTimesData) {
            foreach($openTimesData as $openTimeData) {
                $this->openTimeRepository->updateOrCreate($setting->id, $openTimeData);
            }
        }

        return $setting->refresh();
    }
}
