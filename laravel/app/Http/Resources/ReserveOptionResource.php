<?php

namespace App\Http\Resources;

use App\Models\ReserveOption;
use Illuminate\Http\Resources\Json\JsonResource;

class ReserveOptionResource extends JsonResource
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
            'contractId' => $reserveOption->contract_id,
            'name' => $reserveOption->name,
            'slotTime' => $reserveOption->slot_time,
            'price' => $reserveOption->price,
        ];
    }
}
