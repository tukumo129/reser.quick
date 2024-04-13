<?php

namespace Tests\Feature\Admin;

use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Admin/GetReserveTest.php
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

        $reserve = Reserve::factory()->create();

        $response = $this->json('GET', "/api/admin/reserve/{$reserve->id}");
        $response->assertjson([
            'reserve' => [
                'id' => $reserve->id,
                'contract_id' => $reserve->contract_id,
                'name' => $reserve->name,
                'guest_number' => $reserve->guest_number,
                'start_date_time' => $reserve->start_date_time,
                'end_date_time' => $reserve->end_date_time,
                'uuid' => $reserve->uuid,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }
}
