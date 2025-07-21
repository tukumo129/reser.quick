<?php

namespace Tests\Feature\ReserveOptions;

use App\Models\ReserveOption;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/ReserveOptions/GetReserveOptionTest.php
 */
class GetReserveOptionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var ReserveOption $reserveOption */
        $reserveOption = ReserveOption::factory()->create(['contract_id' => $user->contract_id]);
        $response = $this->json('GET', "/api/reserves/options/{$reserveOption->id}");
        $response->assertJson([
            'reserveOption' => [
                'id' => $reserveOption->id,
                'contractId' => $reserveOption->contract_id,
                'name' => $reserveOption->name,
                'slotTime' => $reserveOption->slot_time,
                'price' => $reserveOption->price,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }

    public function test_reserveoption_not_found(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        // 存在しない予約
        $reserveoptionId = 9999999;

        $response = $this->json('GET', "/api/reserves/options/{$reserveoptionId}");
        $response->assertjson([
            'message' => "Reserve Option with id {$reserveoptionId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
