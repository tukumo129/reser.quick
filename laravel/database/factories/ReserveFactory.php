<?php

namespace Database\Factories;

use App\Enums\ReserveStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ReserveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'contract_id' => random_int(1, 9999),
            'reserve_id' => random_int(1, 9999),
            'name' => $this->faker->name(),
            'guest_number' => random_int(1, 5),
            'start_date_time' => Carbon::now()->format('Y-m-d'),
            'end_date_time' => Carbon::now()->addHours(1)->format('Y-m-d'),
            'uuid' => Str::uuid()->toString(),
            'status' => ReserveStatus::NO_COMPLETE,
        ];
    }
}
