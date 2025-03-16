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

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

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

    /**
     * @return void
     */
    public function testReserveNotFound(): void
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
