<?php

namespace Tests\Feature\Settings;

use App\Models\ReserveSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/UpdateReserveSettingTest.php
 */
class UpdateReserveSettingTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        /** @var ReserveSetting $reserveSetting */
        $reserveSetting = ReserveSetting::factory()->create(['contract_id' => $user->contract_id]);

        $params = [
            'setting' => [
                'max_concurrent_reserve' => 3,
                'reserve_slot_time' => '00:05',
                'default_stay_time' => '01:00',
                'max_reserve_number' => 10,
                'reserve_months_limit' => 2,
            ],
        ];

        $response = $this->json('PUT', '/api/reserve_setting', $params);
        $response->assertJson([
            'reserveSetting' => [
                'id' => $reserveSetting->id,
                'max_concurrent_reserve' => 3,
                'reserve_slot_time' => '00:05',
                'default_stay_time' => '01:00',
                'max_reserve_number' => 10,
                'reserve_months_limit' => 2,
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     * @return void
     */
    public function testCreateSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'setting' => [
                'max_concurrent_reserve' => null,
                'reserve_slot_time' => '00:05',
                'default_stay_time' => '01:00',
                'max_reserve_number' => null,
                'reserve_months_limit' => null,
            ],
        ];

        $response = $this->json('PUT', '/api/reserve_setting', $params);
        $response->assertJson([
            'reserveSetting' => [
                'max_concurrent_reserve' => null,
                'reserve_slot_time' => '00:05',
                'default_stay_time' => '01:00',
                'max_reserve_number' => null,
                'reserve_months_limit' => null,
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
