<?php

namespace Database\Factories;

use App\Enums\DayOfWeek;
use Illuminate\Database\Eloquent\Factories\Factory;

class WeekOpenTimeFactory extends Factory
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
            'week' => $this->faker->randomElement(DayOfWeek::getValues()),
            'open_time' => $this->faker->time(),
            'close_time' => $this->faker->time(),
        ];
    }
}
