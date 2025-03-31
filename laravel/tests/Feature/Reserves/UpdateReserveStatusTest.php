<?php

namespace Tests\Feature\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/UpdateReserveStatusTest.php
 */
class UpdateReserveStatusTest extends TestCase
{
    use DatabaseTransactions;

    public function testSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $reserve = Reserve::factory()->create(['contract_id' => $user->contract_id]);

        $params = [
            'status' => ReserveStatus::COMPLETE,
        ];

        $response = $this->json('PUT', "/api/reserve/{$reserve->id}/status", $params);
        $response->assertJson([
            'reserve' => [
                'id' => true,
                'contractId' => $user->contract_id,
                'reserveId' => $reserve->reserve_id,
                'name' => $reserve->name,
                'guestNumber' => $reserve->guest_number,
                'startDateTime' => $reserve->start_date_time,
                'endDateTime' => $reserve->end_date_time,
                'uuid' => $reserve->uuid,
                'status' => ReserveStatus::COMPLETE,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }

    public function testReserveNotFound(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'status' => ReserveStatus::COMPLETE,
        ];

        // 存在しない予約
        $reserveId = 9999999;

        $response = $this->json('PUT', "/api/reserve/{$reserveId}/status", $params);
        $response->assertJson([
            'message' => "Reserve with id {$reserveId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
