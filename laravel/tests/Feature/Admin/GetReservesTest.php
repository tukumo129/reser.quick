<?php

namespace Tests\Feature\Admin;

use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Admin/GetReservesTest.php
 */
class GetReservesTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        Reserve::query()->forceDelete();
        $contractId = 1; // TODO contractをfactoryで作成するように変える
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contractId]);
        $this->actingAs($user, 'web');

        $reserves = Reserve::factory()->count(2)->create(['contract_id' => $contractId]);

        $response = $this->json('GET', '/api/admin/reserves/');
        $response->assertjson([
            'reserves' => [
                0 => [
                    'id' => $reserves[0]->id,
                    'contract_id' => $reserves[0]->contract_id,
                    'name' => $reserves[0]->name,
                    'guest_number' => $reserves[0]->guest_number,
                    'start_date_time' => $reserves[0]->start_date_time,
                    'end_date_time' => $reserves[0]->end_date_time,
                    'uuid' => $reserves[0]->uuid,
                ],
                1 => [
                    'id' => $reserves[1]->id,
                ],
            ],
            'pagination' => null,
        ])->assertStatus(Response::HTTP_OK);

        $param = [
            'sorts' => [
                'id' => 'desc',
            ],
            'page' => 1,
            'limit' => 1,
        ];
        $response = $this->json('GET', '/api/admin/reserves/', $param);
        $response->assertjson([
            'reserves' => [
                0 => [
                    'id' => $reserves[1]->id,
                    'contract_id' => $reserves[1]->contract_id,
                    'name' => $reserves[1]->name,
                    'guest_number' => $reserves[1]->guest_number,
                    'start_date_time' => $reserves[1]->start_date_time,
                    'end_date_time' => $reserves[1]->end_date_time,
                    'uuid' => $reserves[1]->uuid,
                ],
            ],
            'pagination' => [
                'total' => 2,
                'last_page' => 2,
                'current_page' => 1,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }
}
