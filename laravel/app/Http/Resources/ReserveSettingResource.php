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
            'max_concurrent_reserve' => $this->max_concurrent_reserve ?? null,
            'reserve_slot_time' => $this->reserve_slot_time ?? null,
            'default_stay_time' => $this->default_stay_time ?? null,
            'max_reserve_number' => $this->max_reserve_number ?? null,
            'reserve_months_limit' => $this->reserve_months_limit ?? null,
        ];
    }
}
