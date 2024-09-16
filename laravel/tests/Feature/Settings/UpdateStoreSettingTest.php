<?php

namespace Tests\Feature\Settings;

use App\Enums\DayOfWeek;
use App\Models\DayOpenTime;
use App\Models\StoreSetting;
use App\Models\User;
use App\Models\WeekOpenTime;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/UpdateStoreSettingTest.php
 */
class UpdateStoreSettingTest extends TestCase
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
        /** @var StoreSetting $storeSetting */
        $storeSetting = StoreSetting::factory()->create(['contract_id' => $user->contract_id]);
        /** @var WeekOpenTime $weekOpenTime */
        $weekOpenTime = WeekOpenTime::factory()->create(['store_setting_id' => $storeSetting->id]);
        $deleteWeekOpenTime = WeekOpenTime::factory()->create(['store_setting_id' => $storeSetting->id]);
        /** @var DayOpenTime $dayOpenTime */
        $dayOpenTime = DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id]);
        $deleteDayOpenTime = DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id]);

        $params = [
            'setting' => [
                'store_name' => 'store_name',
                'day_open_times' => [
                    [
                        'id' => $dayOpenTime->id,
                        'date' => '2024-01-01',
                        'open_time' => '00:00',
                        'close_time' => '01:00',
                    ],
                    [
                        'date' => '2024-01-02',
                        'open_time' => '02:00',
                        'close_time' => '03:00',
                    ],
                ],
                'week_open_times' => [
                    [
                        'id' => $weekOpenTime->id,
                        'week' => DayOfWeek::Monday,
                        'open_time' => '04:00',
                        'close_time' => '05:00',
                    ],
                    [
                        'week' => DayOfWeek::Sunday,
                        'open_time' => '06:00',
                        'close_time' => '07:00',
                    ],
                ],
            ],
        ];

        $response = $this->json('PUT', '/api/store_setting', $params);
        $response->assertJson([
            'storeSetting' => [
                'id' => $storeSetting->id,
                'storeName' => 'store_name',
                'dayOpenTimes' => [
                    [
                        'id' => $dayOpenTime->id,
                        'date' => '2024-01-01',
                        'openTime' => '00:00:00',
                        'closeTime' => '01:00:00',
                    ],
                    [
                        'id' => true,
                        'date' => '2024-01-02',
                        'openTime' => '02:00:00',
                        'closeTime' => '03:00:00',
                    ],
                ],
                'weekOpenTimes' => [
                    [
                        'id' => $weekOpenTime->id,
                        'week' => DayOfWeek::Monday,
                        'openTime' => '04:00:00',
                        'closeTime' => '05:00:00',
                    ],
                    [
                        'id' => true,
                        'week' => DayOfWeek::Sunday,
                        'openTime' => '06:00:00',
                        'closeTime' => '07:00:00',
                    ],
                ],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertEmpty(WeekOpenTime::where('id', $deleteWeekOpenTime->id)->first());
        $this->assertEmpty(DayOpenTime::where('id', $deleteDayOpenTime->id)->first());
    }

    /**
     * @return void
     */
    public function testCreateSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'setting' => [
                'store_name' => 'store_name',
            ],
        ];

        $response = $this->json('PUT', '/api/store_setting', $params);
        $response->assertJson([
            'storeSetting' => [
                'storeName' => 'store_name',
                'dayOpenTimes' => [],
                'weekOpenTimes' => [],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
