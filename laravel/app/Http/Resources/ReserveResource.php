<?php

namespace App\Http\Resources;

use App\Models\Reserve;
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
        /** @var Reserve $reserve */
        $reserve = $this->resource;

        return [
            'id' => $reserve->id,
            'contractId' => $reserve->contract_id,
            'reserveId' => $reserve->reserve_id,
            'name' => $reserve->name,
            'guestNumber' => $reserve->guest_number,
            'startDateTime' => $reserve->start_date_time,
            'endDateTime' => $reserve->end_date_time,
            'uuid' => $reserve->uuid,
            'status' => $reserve->status,
        ];
    }
}
