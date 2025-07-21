<?php

namespace Tests\Feature\ReserveOptions;

use App\Models\ReserveOption;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/ReserveOptions/UpdateReserveOptionTest.php
 */
class UpdateReserveOptionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var ReserveOption $reserveOption */
        $reserveOption = ReserveOption::factory()->create(['contract_id' => $user->contract_id]);

        $params = [
            'reserve_option' => [
                'name' => '鈴木 一郎',
                'slot_time' => 60,
                'price' => 1000,
            ],
        ];

        $response = $this->json('PUT', "/api/reserves/options/{$reserveOption->id}", $params);
        $response->assertJson([
            'reserveOption' => [
                'id' => $reserveOption->id,
                'contractId' => $user->contract_id,
                'name' => '鈴木 一郎',
                'slotTime' => 60,
                'price' => 1000,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }

    public function test_reserveoption_not_found(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'reserve_option' => [
                'name' => '鈴木 一郎',
                'slot_time' => 60,
                'price' => 1000,
            ],
        ];

        // 存在しない予約
        $reserveOptionId = 9999999;

        $response = $this->json('PUT', "/api/reserves/options/{$reserveOptionId}", $params);
        $response->assertJson([
            'message' => "Reserve Option with id {$reserveOptionId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
