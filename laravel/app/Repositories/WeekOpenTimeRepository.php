<?php

namespace App\Repositories;

use App\Models\WeekOpenTime;
use Illuminate\Database\Eloquent\Collection;

class WeekOpenTimeRepository
{
    /**
     * @param int $storeSettingId
     * @param int $id
     * @return WeekOpenTime
     */
    public function find(int $storeSettingId, int $id): WeekOpenTime
    {
        return WeekOpenTime::where('store_setting_id', $storeSettingId)->where('id', $id)->first();
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<int, WeekOpenTime>
     */
    public function findBy(array $criteria): ?Collection
    {
        $query = WeekOpenTime::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * @param int $storeSettingId
     * @param array<string, mixed> $data
     * @return WeekOpenTime
     */
    public function updateOrCreate(int $storeSettingId, array $data): WeekOpenTime
    {
        $weekOpenTime = null;
        if(isset($data['id'])) {
            $weekOpenTime = $this->find($storeSettingId, $data['id']);
        }
        if(!$weekOpenTime) {
            $weekOpenTime = new WeekOpenTime();
            $weekOpenTime->store_setting_id = $storeSettingId;
        }
        $weekOpenTime->fill($data)->save();
        return $weekOpenTime;
    }

    /**
     * @param int $storeSettingId
     * @param array<int> $dayOpenTimeIds
     * @param array<string, mixed> $data
     * @return void
     */
    public function cleanupRemove(int $storeSettingId, array $weekOpenTimeIds): void
    {
        $weekOpenTimes = $this->findBy(['store_setting_id' => $storeSettingId]);
        $deleteIds = array_diff($weekOpenTimes->pluck('id')->toArray(), $weekOpenTimeIds);
        WeekOpenTime::whereIn('id', $deleteIds)->delete();
    }
}
