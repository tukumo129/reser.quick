<?php

namespace Tests\Feature\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Contract;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/CreateReserveTest.php
 */
class CreateReserveTest extends TestCase
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
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'status' => ReserveStatus::NO_COMPLETE,
            ],
        ];

        $response = $this->json('POST', '/api/reserves/', $params);
        $response->assertJson([
            'reserve' => [
                'id' => true,
                'contractId' => $user->contract_id,
                'reserveId' => 'R00000001',
                'name' => '鈴木 一郎',
                'guestNumber' => 1,
                'startDateTime' => '2024-01-02 12:34:56',
                'endDateTime' => '2024-01-02 13:34:56',
                'uuid' => true,
                'status' => ReserveStatus::NO_COMPLETE,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }
}
