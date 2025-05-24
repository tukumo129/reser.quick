<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
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
            'store_name' => random_int(1, 10),
            'reserve_slot_time' => '30',
            'max_reserve_number' => random_int(1, 10),
            'reserve_months_limit' => random_int(1, 10),
            'reserve_block_minutes' => random_int(30, 60),
            'max_available_reserve' => random_int(1, 100),
        ];
    }
}
