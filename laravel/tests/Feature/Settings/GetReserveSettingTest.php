<?php

namespace Tests\Feature\Settings;

use App\Models\Contract;
use App\Models\ReserveSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/GetReserveSettingTest.php
 */
class GetReserveSettingTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        /** @var ReserveSetting $reserveSetting */
        $reserveSetting = ReserveSetting::factory()->create(['contract_id' => $user->contract_id]);

        $params = [];

        $response = $this->json('GET', '/api/reserve_setting', $params);
        $response->assertJson([
            'reserveSetting' => [
                'id' => $reserveSetting->id,
                'maxConcurrentReserve' => $reserveSetting->max_concurrent_reserve,
                'reserveSlotTime' => $reserveSetting->reserve_slot_time,
                'defaultStayTime' => $reserveSetting->default_stay_time,
                'maxReserveNumber' => $reserveSetting->max_reserve_number,
                'reserveMonthsLimit' => $reserveSetting->reserve_months_limit,
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     * @return void
     */
    public function testEmptySuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        $params = [];

        $response = $this->json('GET', '/api/reserve_setting', $params);
        $response->assertStatus(Response::HTTP_OK);
    }
}
