<?php

namespace App\Repositories;

use App\Models\OpenTime;
use Illuminate\Database\Eloquent\Collection;

class OpenTimeRepository
{
    /**
     * @param int $settingId
     * @param int $id
     * @return OpenTime
     */
    public function get(int $settingId, int $id): OpenTime
    {
        return OpenTime::where('setting_id', $settingId)->where('id', $id)->first();
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<int, OpenTime>
     */
    public function getBy(array $criteria): Collection
    {
        $query = OpenTime::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * @param int $settingId
     * @param array<string, mixed> $data
     * @return OpenTime
     */
    public function updateOrCreate(int $settingId, array $data): OpenTime
    {
        $openTime = null;
        if(isset($data['id'])) {
            $openTime = $this->get($settingId, $data['id']);
        }
        if(!$openTime) {
            $openTime = new OpenTime();
            $openTime->setting_id = $settingId;
        }
        $openTime->fill($data)->save();
        return $openTime;
    }

    /**
     * @param integer $settingId
     * @param array $openTimeIds
     * @return void
     */
    public function cleanupDelete(int $settingId, array $openTimeIds): void
    {
        $openTimes = $this->getBy(['setting_id' => $settingId]);
        $deleteIds = array_diff($openTimes->pluck('id')->toArray(), $openTimeIds);
        OpenTime::whereIn('id', $deleteIds)->delete();
    }
}
