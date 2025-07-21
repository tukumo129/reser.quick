<?php

namespace Tests\Feature\ReserveOptions;

use App\Models\Contract;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/ReserveOptions/CreateReserveOptionTest.php
 */
class CreateReserveOptionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        $params = [
            'reserve_option' => [
                'name' => 'サンプルプラン',
                'slot_time' => 60,
                'price' => 1000,
            ],
        ];

        $response = $this->json('POST', '/api/reserves/options/', $params);
        $response->assertJson([
            'reserveOption' => [
                'id' => true,
                'contractId' => $user->contract_id,
                'name' => 'サンプルプラン',
                'slotTime' => 60,
                'price' => 1000,
            ],
        ])->assertStatus(Response::HTTP_CREATED);
    }
}
