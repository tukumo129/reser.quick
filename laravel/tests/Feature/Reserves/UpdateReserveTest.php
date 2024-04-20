<?php

namespace Tests\Feature\Reserves;

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
        $contractId = 1;

        $reserve = Reserve::factory()->create(['contract_id' => $contractId]);

        $params = [
            'reserve' => [
                'contract_id' => $contractId, // TODO factoryでcontractを作成するように修正
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'uuid' => 'b26a59f5-1d77-4a3b-b94b-bb64d1d0e5a6',
            ],
        ];

        $response = $this->json('PUT', "/api/reserve/{$reserve->id}", $params);
        $response->assertjson([
            'reserve' => [
                'id' => true,
                'contract_id' => $contractId,
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'uuid' => 'b26a59f5-1d77-4a3b-b94b-bb64d1d0e5a6',
            ],
        ])->assertStatus(Response::HTTP_OK);
    }

    /**
     * @return void
     */
    public function testReserveNotFound(): void
    {
        $contractId = 1;
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'reserve' => [
                'contract_id' => $contractId, // TODO factoryでcontractを作成するように修正
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'uuid' => 'b26a59f5-1d77-4a3b-b94b-bb64d1d0e5a6',
            ],
        ];

        // 存在しない予約
        $reserveId = 9999999;

        $response = $this->json('PUT', "/api/reserve/{$reserveId}", $params);
        $response->assertjson([
            'message' => "Reserve with id {$reserveId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
