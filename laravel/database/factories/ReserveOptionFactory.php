<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReserveOptionFactory extends Factory
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
            'name' => $this->faker->name(),
            'slot_time' => random_int(30, 60),
            'price' => random_int(1, 9999),
        ];
    }
}
