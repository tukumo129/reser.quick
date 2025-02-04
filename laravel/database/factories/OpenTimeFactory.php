<?php

namespace Database\Factories;

use App\Enums\DayOfWeek;
use App\Enums\OpenTimeType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpenTimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'setting_id' => random_int(1, 9999),
            'type' => $this->faker->randomElement(OpenTimeType::getValues()),
            'date' => Carbon::now()->format('Y-m-d'),
            'week' => $this->faker->randomElement(DayOfWeek::getValues()),
            'start_time' => $this->faker->time(),
            'end_time' => $this->faker->time(),
            'max_available_reserve' => random_int(1, 100),
        ];
    }
}
