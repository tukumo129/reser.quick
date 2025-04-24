<?php

namespace Tests\Feature\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/UpdateReserveTest.php
 */
class UpdateReserveTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var Reserve $reserve */
        $reserve = Reserve::factory()->create(['contract_id' => $user->contract_id]);

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'status' => ReserveStatus::COMPLETE,
            ],
        ];

        $response = $this->json('PUT', "/api/reserve/{$reserve->id}", $params);
        $response->assertJson([
            'reserve' => [
                'id' => true,
                'contractId' => $user->contract_id,
                'reserveId' => $reserve->reserve_id,
                'name' => '鈴木 一郎',
                'guestNumber' => 1,
                'startDateTime' => '2024-01-02 12:34:56',
                'endDateTime' => '2024-01-02 13:34:56',
                'uuid' => $reserve->uuid,
                'status' => ReserveStatus::COMPLETE,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }

    public function test_reserve_not_found(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'status' => ReserveStatus::COMPLETE,
            ],
        ];

        // 存在しない予約
        $reserveId = 9999999;

        $response = $this->json('PUT', "/api/reserve/{$reserveId}", $params);
        $response->assertJson([
            'message' => "Reserve with id {$reserveId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
