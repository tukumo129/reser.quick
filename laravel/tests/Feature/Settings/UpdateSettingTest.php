<?php

namespace Tests\Feature\Settings;

use App\Enums\DayOfWeek;
use App\Enums\OpenTimeType;
use App\Models\OpenTime;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/UpdateSettingTest.php
 */
class UpdateSettingTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $user->contract_id]);
        /** @var OpenTime $openTime */
        $openTime = OpenTime::factory()->create(['setting_id' => $setting->id]);
        /** @var OpenTime $deleteOpenTime */
        $deleteOpenTime = OpenTime::factory()->create(['setting_id' => $setting->id]);
        $params = [
            'setting' => [
                'store_name' => 'store_name',
                'reserve_slot_time' => '30',
                'max_reserve_number' => 5,
                'reserve_months_limit' => 3,
                'reserve_block_minutes' => 30,
                'max_available_reserve' => 10,
                'open_times' => [
                    [
                        'id' => $openTime->id,
                        'type' => OpenTimeType::WEEK,
                        'date' => '2024-01-01',
                        'week' => DayOfWeek::Monday,
                        'start_time' => '00:00',
                        'end_time' => '01:00',
                        'max_available_reserve' => 7,

                    ],
                    [
                        'id' => null,
                        'type' => OpenTimeType::DAY,
                        'date' => '2024-01-02',
                        'week' => null,
                        'start_time' => '02:00',
                        'end_time' => '03:00',
                        'max_available_reserve' => 8,
                    ],
                ],
            ],
        ];

        $response = $this->json('PUT', '/api/setting', $params);
        $response->assertJson([
            'setting' => [
                'storeName' => 'store_name',
                'reserveSlotTime' => 30,
                'maxReserveNumber' => 5,
                'reserveMonthsLimit' => 3,
                'reserveBlockMinutes' => 30,
                'maxAvailableReserve' => 10,
                'openTimes' => [
                    [
                        'id' => true,
                        'type' => OpenTimeType::WEEK,
                        'date' => '2024-01-01',
                        'week' => DayOfWeek::Monday,
                        'startTime' => '00:00',
                        'endTime' => '01:00',
                        'maxAvailableReserve' => 7,

                    ],
                    [
                        'id' => true,
                        'type' => OpenTimeType::DAY,
                        'date' => '2024-01-02',
                        'week' => null,
                        'startTime' => '02:00',
                        'endTime' => '03:00',
                        'maxAvailableReserve' => 8,
                    ],
                ],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);

        $deleteOpenTime = OpenTime::where('id', $deleteOpenTime->id)->first();
        $this->assertNull($deleteOpenTime);
    }

    public function test_create_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'setting' => [
                'store_name' => 'store_name',
                'reserve_slot_time' => '30',
                'max_reserve_number' => 5,
                'reserve_months_limit' => 3,
                'reserve_block_minutes' => 30,
                'max_available_reserve' => 10,
                'open_times' => [
                    [
                        'type' => OpenTimeType::WEEK,
                        'date' => '2024-01-01',
                        'week' => DayOfWeek::Monday,
                        'start_time' => '00:00',
                        'end_time' => '01:00',
                        'max_available_reserve' => 7,

                    ],
                    [
                        'type' => OpenTimeType::DAY,
                        'date' => '2024-01-02',
                        'week' => null,
                        'start_time' => '02:00',
                        'end_time' => '03:00',
                        'max_available_reserve' => 8,
                    ],
                ],
            ],
        ];

        $response = $this->json('PUT', '/api/setting', $params);
        $response->assertJson([
            'setting' => [
                'storeName' => 'store_name',
                'reserveSlotTime' => 30,
                'maxReserveNumber' => 5,
                'reserveMonthsLimit' => 3,
                'reserveBlockMinutes' => 30,
                'maxAvailableReserve' => 10,
                'openTimes' => [
                    [
                        'id' => true,
                        'type' => OpenTimeType::WEEK,
                        'date' => '2024-01-01',
                        'week' => DayOfWeek::Monday,
                        'startTime' => '00:00',
                        'endTime' => '01:00',
                        'maxAvailableReserve' => 7,

                    ],
                    [
                        'id' => true,
                        'type' => OpenTimeType::DAY,
                        'date' => '2024-01-02',
                        'week' => null,
                        'startTime' => '02:00',
                        'endTime' => '03:00',
                        'maxAvailableReserve' => 8,
                    ],
                ],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
