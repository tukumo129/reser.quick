<?php

namespace App\Repositories;

use App\Models\StoreSetting;

class StoreSettingRepository
{
    /**
     * @param array<string, mixed> $criteria
     * @return StoreSetting|null
     */
    public function findBy(array $criteria): ?StoreSetting
    {
        $query = StoreSetting::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->first();
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $data
     * @return StoreSetting
     */
    public function updateOrCreate(int $contractId, array $data): StoreSetting
    {
        $storeSetting = $this->findBy(['contract_id' => $contractId]);
        if(!$storeSetting) {
            $storeSetting = new StoreSetting();
            $storeSetting->contract_id = $contractId;
        }
        $storeSetting->fill($data)->save();
        return $storeSetting;
    }
}
