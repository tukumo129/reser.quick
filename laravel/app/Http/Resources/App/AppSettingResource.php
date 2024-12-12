<?php

namespace App\Http\Resources\App;

use App\Models\Contract;
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
        /** @var Contract $this */
        $reserveSetting = $this->reserveSetting;
        return [
            'storeName' => $this->storeSetting->store_name,
            'maxConcurrentReserve' => $reserveSetting->max_concurrent_reserve,
            'reserveSlotTime' => $reserveSetting->reserve_slot_time,
            'defaultStayTime' => $reserveSetting->default_stay_time,
            'maxReserveNumber' => $reserveSetting->max_reserve_number,
            'reserveMonthsLimit' => $reserveSetting->reserve_months_limit,
        ];
    }
}
