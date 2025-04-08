<?php

namespace Tests\Feature\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Reserve;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/GetReservesTest.php
 */
class GetReservesTest extends TestCase
{
    use DatabaseTransactions;

    public function testSuccess(): void
    {
        // パラメーターなし、全件取得
        Reserve::query()->forceDelete();
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $reserves = Reserve::factory()->count(2)->create(['contract_id' => $user->contract_id]);

        $response = $this->json('GET', '/api/reserves/', []);
        $response->assertJson([
            'reserves' => [
                0 => [
                    'id' => $reserves[0]->id,
                    'contractId' => $reserves[0]->contract_id,
                    'reserveId' => $reserves[0]->reserve_id,
                    'name' => $reserves[0]->name,
                    'guestNumber' => $reserves[0]->guest_number,
                    'startDateTime' => $reserves[0]->start_date_time,
                    'endDateTime' => $reserves[0]->end_date_time,
                    'uuid' => $reserves[0]->uuid,
                    'status' => $reserves[0]->status,
                ],
                1 => [
                    'id' => $reserves[1]->id,
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
        $response = $this->json('GET', '/api/reserves/', $param);
        $response->assertJson([
            'reserves' => [
                0 => [
                    'id' => $reserves[1]->id,
                    'contractId' => $reserves[1]->contract_id,
                    'reserveId' => $reserves[1]->reserve_id,
                    'name' => $reserves[1]->name,
                    'guestNumber' => $reserves[1]->guest_number,
                    'startDateTime' => $reserves[1]->start_date_time,
                    'endDateTime' => $reserves[1]->end_date_time,
                    'uuid' => $reserves[1]->uuid,
                    'status' => $reserves[1]->status,
                ],
            ],
            'pagination' => [
                'total' => 2,
                'last_page' => 2,
                'page' => 1,
            ],
        ])->assertStatus(Response::HTTP_OK);

        // ゼロ件取得
        Reserve::query()->forceDelete();
        $response = $this->json('GET', '/api/reserves/', []);

        // 条件で絞り込み
        // 取得対象
        $reserves = Reserve::factory()->count(2)->create(['contract_id' => $user->contract_id,'status' => ReserveStatus::COMPLETE,'start_date_time' => Carbon::now()->format('Y-m-d H:i'),]);

        //　ステータス違い
        $reserves = Reserve::factory()->create([
            'contract_id' => $user->contract_id,
            'status' => ReserveStatus::NO_COMPLETE,
            'start_date_time' => Carbon::now()->format('Y-m-d H:i'),
        ]);

        // 期間前の予約時間
        $reserves = Reserve::factory()->create([
            'contract_id' => $user->contract_id,
            'status' => ReserveStatus::COMPLETE,
            'start_date_time' => Carbon::now()->subMinutes(31)->format('Y-m-d H:i'),
        ]);

        // 期間後の予約時間
        $reserves = Reserve::factory()->create([
            'contract_id' => $user->contract_id,
            'status' => ReserveStatus::COMPLETE,
            'start_date_time' => Carbon::now()->addMinutes(31)->format('Y-m-d H:i'),
        ]);

        $param = [
            'criteria' => [
                'status' => ReserveStatus::COMPLETE,
            ],
            'period_criteria' => [
                'start_date_time' => Carbon::now()->subMinutes(30)->format('Y-m-d H:i'),
                'end_date_time' => Carbon::now()->addMinutes(30)->format('Y-m-d H:i'),
            ],
        ];
        $response = $this->json('GET', '/api/reserves/', $param);
        $response->assertJson([
            'reserves' => [],
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonCount(2, 'reserves');
    }
}
