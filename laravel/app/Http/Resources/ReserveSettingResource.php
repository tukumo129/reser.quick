<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReserveSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var ReserveSetting|null $this */
        return [
            'id' => $this->id ?? null,
            'maxConcurrentReserve' => $this->max_concurrent_reserve ?? null,
            'reserveSlotTime' => $this->reserve_slot_time ?? null,
            'defaultStayTime' => $this->default_stay_time ?? null,
            'maxReserveNumber' => $this->max_reserve_number ?? null,
            'reserveMonthsLimit' => $this->reserve_months_limit ?? null,
        ];
    }
}
