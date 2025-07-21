<?php

namespace Tests\Feature\ReserveOptions;

use App\Models\ReserveOption;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/ReserveOptions/GetReserveOptionsTest.php
 */
class GetReserveOptionsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        // パラメーターなし、全件取得
        ReserveOption::query()->forceDelete();
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var Collection<ReserveOption> $reserveOptions */
        $reserveOptions = ReserveOption::factory()->count(2)->create(['contract_id' => $user->contract_id]);

        $response = $this->json('GET', '/api/reserves/options/', []);
        $response->assertJson([
            'reserveOptions' => [
                0 => [
                    'id' => $reserveOptions[0]->id,
                    'contractId' => $reserveOptions[0]->contract_id,
                    'name' => $reserveOptions[0]->name,
                    'slotTime' => $reserveOptions[0]->slot_time,
                    'price' => $reserveOptions[0]->price,
                ],
                1 => [
                    'id' => $reserveOptions[1]->id,
                ],
            ],
            'pagination' => null,
        ])->assertStatus(Response::HTTP_OK);

        // パラメーターあり、ページネーションあり
        $param = [
            'sorts' => [
                'id' => 'desc',
            ],
            'page' => 1,
            'limit' => 1,
        ];
        $response = $this->json('GET', '/api/reserves/options/', $param);
        $response->assertJson([
            'reserveOptions' => [
                0 => [
                    'id' => $reserveOptions[1]->id,
                    'contractId' => $reserveOptions[1]->contract_id,
                    'name' => $reserveOptions[1]->name,
                    'slotTime' => $reserveOptions[1]->slot_time,
                    'price' => $reserveOptions[1]->price,
                ],
            ],
            'pagination' => [
                'total' => 2,
                'last_page' => 2,
                'page' => 1,
            ],
        ])->assertStatus(Response::HTTP_OK);

        // ゼロ件取得
        ReserveOption::query()->forceDelete();
        $response = $this->json('GET', '/api/reserves/options/', []);

        // 条件で絞り込み
        // 取得対象
        /** @var Collection<ReserveOption> $reserveOptions */
        $reserveOptions = ReserveOption::factory()->count(2)->create(['contract_id' => $user->contract_id, 'name' => 'test']);

        ReserveOption::factory()->count(2)->create(['contract_id' => $user->contract_id, 'name' => 'other']);

        $param = [
            'search_key' => 'test',
        ];
        $response = $this->json('GET', '/api/reserves/options/', $param);
        $response->assertJson([
            'reserveOptions' => [],
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonCount(2, 'reserveOptions');
    }
}
