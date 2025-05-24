<?php

namespace App\Http\Resources;

use App\Models\OpenTime;
use App\Models\Setting;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var Setting|null $setting */
        $setting = $this->resource;

        return [
            'storeName' => $setting->store_name ?? '',
            'reserveSlotTime' => $setting->reserve_slot_time ?? '5',
            'maxReserveNumber' => $setting->max_reserve_number,
            'reserveMonthsLimit' => $setting->reserve_months_limit,
            'reserveBlockMinutes' => $setting->reserve_block_minutes,
            'maxAvailableReserve' => $setting->max_available_reserve ?? null,
            'openTimes' => empty($setting->openTimes) ? [] : $setting->openTimes->map(function (OpenTime $openTime) {
                return [
                    'id' => $openTime->id,
                    'type' => $openTime->type,
                    'date' => $openTime->date,
                    'week' => $openTime->week,
                    'startTime' => $openTime->start_time,
                    'endTime' => $openTime->end_time,
                    'maxAvailableReserve' => $openTime->max_available_reserve,
                ];
            }),
        ];
    }
}
