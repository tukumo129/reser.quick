<?php

namespace App\Http\Resources;

use App\Models\OpenTime;
use Illuminate\Http\Resources\Json\JsonResource;

class openTimeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /** @var OpenTime|null $openTime */
        $openTime = $this->resource;

        return [
            'id' => $openTime->id,
            'type' => $openTime->type,
            'date' => $openTime->date,
            'week' => $openTime->week,
            'startTime' => $openTime->start_time,
            'endTime' => $openTime->end_time,
            'maxAvailableReserve' => $openTime->max_available_reserve,
        ];
    }
}
