<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ReserveSettingFactory extends Factory
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
            'max_concurrent_reserve' => random_int(1, 10),
            'reserve_slot_time' => '00:15',
            'default_stay_time' => '01:00',
            'max_reserve_number' => random_int(1, 10),
            'reserve_months_limit' => random_int(1, 10),
        ];
    }
}
