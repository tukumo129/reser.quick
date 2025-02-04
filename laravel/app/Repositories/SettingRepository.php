<?php

namespace App\Repositories;

use App\Models\Setting;

class SettingRepository
{
    /**
     * @param array<string, mixed> $criteria
     * @return Setting|null
     */
    public function getBy(array $criteria): ?Setting
    {
        $query = Setting::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->first();
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $data
     * @return Setting
     */
    public function updateOrCreate(int $contractId, array $data): Setting
    {
        $setting = $this->getBy(['contract_id' => $contractId]);
        if(!$setting) {
            $setting = new Setting();
            $setting->contract_id = $contractId;
        }
        $setting->fill($data)->save();
        return $setting;
    }
}
