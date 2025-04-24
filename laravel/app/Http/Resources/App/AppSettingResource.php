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
        /** @var Setting $setting */
        $setting = $this->resource;

        return [
            'storeName' => $setting->store_name ?? null,
            'reserveSlotTime' => $setting->reserve_slot_time ?? null,
            'maxReserveNumber' => $setting->max_reserve_number ?? null,
            'reserveMonthsLimit' => $setting->reserve_months_limit ?? null,
        ];
    }
}
