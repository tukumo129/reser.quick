<?php

namespace Tests\Feature\Reserves;

use App\Models\Reserve;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/GetReservesCountTest.php
 */
class GetReservesCountTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        Reserve::query()->forceDelete();
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $targetDate = Carbon::now()->startOfWeek()->startOfDay();
        // 当日内
        Reserve::factory()->count(1)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-09 01:00']);
        Reserve::factory()->count(2)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-09 02:00']);
        Reserve::factory()->count(3)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-09 23:30']);

        // 週間内
        Reserve::factory()->count(4)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-07 01:00']);
        Reserve::factory()->count(5)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-10 02:00']);
        Reserve::factory()->count(6)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-13 03:00']);

        // 月内
        Reserve::factory()->count(7)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-01 01:00']);
        Reserve::factory()->count(8)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-15 02:00']);
        Reserve::factory()->count(9)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-04-30 03:00']);

        // 対象外
        Reserve::factory()->count(10)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-03-31 23:30']);
        Reserve::factory()->count(11)->create(['contract_id' => $user->contract_id, 'start_date_time' => '2025-05-01 00:00']);

        // １時間単位、１日
        $param = [
            'date_time' => '2025-04-09 00:00',
        ];

        $response = $this->json('GET', '/api/reserves/count', $param);
        $response->assertJson([
            'reservesCount' => [
                'dailyReserveCountPerHour' => [
                    0 => [
                        'dateTime' => '2025-04-09 00:00',
                        'count' => 0,
                    ],
                    1 => [
                        'dateTime' => '2025-04-09 01:00',
                        'count' => 1,
                    ],
                    2 => [
                        'dateTime' => '2025-04-09 02:00',
                        'count' => 2,
                    ],
                    23 => [
                        'dateTime' => '2025-04-09 23:00',
                        'count' => 3,
                    ],
                ],
                'weeklyReserveCountPerDay' => [
                    0 => [
                        'dateTime' => '2025-04-07 00:00',
                        'count' => 4,
                    ],
                    1 => [
                        'dateTime' => '2025-04-08 00:00',
                        'count' => 0,
                    ],
                    2 => [
                        'dateTime' => '2025-04-09 00:00',
                        'count' => 6,
                    ],
                    3 => [
                        'dateTime' => '2025-04-10 00:00',
                        'count' => 5,
                    ],
                    6 => [
                        'dateTime' => '2025-04-13 00:00',
                        'count' => 6,
                    ],
                ],
                'monthlyReserveCountPerDay' => [
                    0 => [
                        'dateTime' => '2025-04-01 00:00',
                        'count' => 7,
                    ],
                    6 => [
                        'dateTime' => '2025-04-07 00:00',
                        'count' => 4,
                    ],
                    8 => [
                        'dateTime' => '2025-04-09 00:00',
                        'count' => 6,
                    ],
                    9 => [
                        'dateTime' => '2025-04-10 00:00',
                        'count' => 5,
                    ],
                    12 => [
                        'dateTime' => '2025-04-13 00:00',
                        'count' => 6,
                    ],
                    14 => [
                        'dateTime' => '2025-04-15 00:00',
                        'count' => 8,
                    ],
                    29 => [
                        'dateTime' => '2025-04-30 00:00',
                        'count' => 9,
                    ],
                ],
            ],
        ])->assertStatus(Response::HTTP_OK);
    }
}
