<?php

namespace App\Http\Resources\App;

use App\Models\Setting;
use Illuminate\Http\Resources\Json\JsonResource;

class AppSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var Setting $this */
        return [
            'storeName' => $this->store_name ?? null,
            'reserveSlotTime' => $this->reserve_slot_time ?? null,
            'maxReserveNumber' => $this->max_reserve_number ?? null,
            'reserveMonthsLimit' => $this->reserve_months_limit ?? null,
        ];
    }
}
