<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class DayOpenTimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'store_setting_id' => random_int(1, 9999),
            'date' => Carbon::now()->format('Y-m-d'),
            'open_time' => $this->faker->time(),
            'close_time' => $this->faker->time(),
        ];
    }
}
