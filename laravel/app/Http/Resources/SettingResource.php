<?php

namespace App\Http\Resources;

use App\Models\Setting;
use App\Models\OpenTime;
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
        /** @var Setting|null $this */
        return [
            'storeName' => $this->store_name ?? null,
            'reserveSlotTime' => $this->reserve_slot_time ?? null,
            'maxReserveNumber' => $this->max_reserve_number ?? null,
            'reserveMonthsLimit' => $this->reserve_months_limit ?? null,
            'maxAvailableReserve' => $this->max_available_reserve ?? null,
            'openTimes' => empty($this->openTimes) ? [] : $this->openTimes->map(function (OpenTime $openTime) {
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
