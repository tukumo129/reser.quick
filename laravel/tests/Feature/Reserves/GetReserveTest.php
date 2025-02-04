<?php

namespace Tests\Feature\Reserves;

use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/GetReserveTest.php
 */
class GetReserveTest extends TestCase
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

        $response = $this->json('GET', "/api/reserve/{$reserve->id}");
        $response->assertJson([
            'reserve' => [
                'id' => $reserve->id,
                'contractId' => $reserve->contract_id,
                'name' => $reserve->name,
                'guestNumber' => $reserve->guest_number,
                'startDateTime' => $reserve->start_date_time,
                'endDateTime' => $reserve->end_date_time,
                'uuid' => $reserve->uuid,
                'status' => $reserve->status,
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

        // 存在しない予約
        $reserveId = 9999999;

        $response = $this->json('GET', "/api/reserve/{$reserveId}");
        $response->assertjson([
            'message' => "Reserve with id {$reserveId} not found.",
        ])->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
