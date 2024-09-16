<?php

namespace App\Http\Resources;

use App\Models\DayOpenTime;
use App\Models\StoreSetting;
use App\Models\WeekOpenTime;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var StoreSetting|null $this */
        $weekOpenTimes = $this->weekOpenTimes ?? null;
        $dayOpenTimes = $this->dayOpenTimes ?? null;
        return [
            'id' => $this->id ?? null,
            'storeName' => $this->store_name ?? null,
            'weekOpenTimes' => empty($weekOpenTimes) ? [] : $weekOpenTimes->map(function (WeekOpenTime $weekOpenTime) {
                return [
                    'id' => $weekOpenTime->id,
                    'week' => $weekOpenTime->week,
                    'openTime' => $weekOpenTime->open_time,
                    'closeTime' => $weekOpenTime->close_time,
                ];
            }),
            'dayOpenTimes' => empty($dayOpenTimes) ? [] : $dayOpenTimes->map(function (DayOpenTime $dayOpenTime) {
                return [
                    'id' => $dayOpenTime->id,
                    'date' => $dayOpenTime->date,
                    'openTime' => $dayOpenTime->open_time,
                    'closeTime' => $dayOpenTime->close_time,
                ];
            }),
        ];
    }
}
