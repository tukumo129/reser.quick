<?php

namespace App\Repositories;

use App\Models\ReserveSetting;

class ReserveSettingRepository
{
    /**
     * @param array<string, mixed> $criteria
     * @return ReserveSetting|null
     */
    public function findBy(array $criteria): ?ReserveSetting
    {
        $query = ReserveSetting::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->first();
    }

    /**
     * @param int $contractId
     * @param array<string, mixed> $data
     * @return ReserveSetting
     */
    public function updateOrCreate(int $contractId, array $data): ReserveSetting
    {
        $reserveSetting = $this->findBy(['contract_id' => $contractId]);
        if(!$reserveSetting) {
            $reserveSetting = new ReserveSetting();
            $reserveSetting->contract_id = $contractId;
        }
        $reserveSetting->fill($data)->save();
        return $reserveSetting;
    }
}
