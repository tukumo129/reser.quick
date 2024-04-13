<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReserveResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'contract_id' => $this->contract_id,
            'name' => $this->name,
            'guest_number' => $this->guest_number,
            'start_date_time' => $this->start_date_time,
            'end_date_time' => $this->end_date_time,
            'uuid' => $this->uuid,
        ];
    }
}
