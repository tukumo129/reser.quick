<?php

namespace App\Http\Resources;

use App\Models\OpenTime;
use Illuminate\Http\Resources\Json\JsonResource;

class OpenTimeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var OpenTime|null $this */
        return [
            'id' => $this->id,
            'type' => $this->type,
            'date' => $this->date,
            'week' => $this->week,
            'startTime' => $this->start_time,
            'endTime' => $this->end_time,
            'maxAvailableReserve' => $this->max_available_reserve,
        ];
    }
}
