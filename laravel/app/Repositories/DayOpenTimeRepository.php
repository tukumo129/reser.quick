<?php

namespace App\Repositories;

use App\Models\DayOpenTime;
use Illuminate\Database\Eloquent\Collection;

class DayOpenTimeRepository
{
    /**
     * @param int $storeSettingId
     * @param int $id
     * @return DayOpenTime
     */
    public function find(int $storeSettingId, int $id): DayOpenTime
    {
        return DayOpenTime::where('store_setting_id', $storeSettingId)->where('id', $id)->first();
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<int, DayOpenTime>
     */
    public function findBy(array $criteria): Collection
    {
        $query = DayOpenTime::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * @param int $storeSettingId
     * @param array<string, mixed> $data
     * @return DayOpenTime
     */
    public function updateOrCreate(int $storeSettingId, array $data): DayOpenTime
    {
        $dayOpenTime = null;
        if(isset($data['id'])) {
            $dayOpenTime = $this->find($storeSettingId, $data['id']);
        }
        if(!$dayOpenTime) {
            $dayOpenTime = new DayOpenTime();
            $dayOpenTime->store_setting_id = $storeSettingId;
        }
        $dayOpenTime->fill($data)->save();
        return $dayOpenTime;
    }

    /**
     * @param integer $storeSettingId
     * @param array $dayOpenTimeIds
     * @return void
     */
    public function cleanupRemove(int $storeSettingId, array $dayOpenTimeIds): void
    {
        $dayOpenTimes = $this->findBy(['store_setting_id' => $storeSettingId]);
        $deleteIds = array_diff($dayOpenTimes->pluck('id')->toArray(), $dayOpenTimeIds);
        DayOpenTime::whereIn('id', $deleteIds)->delete();
    }
}
