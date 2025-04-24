<?php

namespace App\Repositories;

use App\Models\OpenTime;
use Illuminate\Database\Eloquent\Collection;

class OpenTimeRepository
{
    public function get(int $settingId, int $id): OpenTime
    {
        return OpenTime::where('setting_id', $settingId)->where('id', $id)->first();
    }

    /**
     * @param  array<string, mixed>  $criteria
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
     * @param  array<string, mixed>  $data
     */
    public function updateOrCreate(int $settingId, array $data): OpenTime
    {
        $openTime = null;
        if (isset($data['id'])) {
            $openTime = $this->get($settingId, $data['id']);
        }
        if (! $openTime) {
            $openTime = new OpenTime;
            $openTime->setting_id = $settingId;
        }
        $openTime->fill($data)->save();

        return $openTime;
    }

    public function cleanupDelete(int $settingId, array $openTimeIds): void
    {
        $openTimes = $this->getBy(['setting_id' => $settingId]);
        $deleteIds = array_diff($openTimes->pluck('id')->toArray(), $openTimeIds);
        OpenTime::whereIn('id', $deleteIds)->delete();
    }
}
