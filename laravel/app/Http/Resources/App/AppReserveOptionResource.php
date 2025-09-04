<?php

namespace App\Http\Resources\App;

use App\Models\ReserveOption;
use Illuminate\Http\Resources\Json\JsonResource;

class AppReserveOptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var ReserveOption $reserveOption */
        $reserveOption = $this->resource;

        return [
            'id' => $reserveOption->id,
            'name' => $reserveOption->name,
            'slotTime' => $reserveOption->slot_time,
            'price' => $reserveOption->price,
        ];
    }
}
