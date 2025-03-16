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
            'contractId' => $this->contract_id,
            'reserveId' => $this->reserve_id,
            'name' => $this->name,
            'guestNumber' => $this->guest_number,
            'startDateTime' => $this->start_date_time,
            'endDateTime' => $this->end_date_time,
            'uuid' => $this->uuid,
            'status' => $this->status,
        ];
    }
}
