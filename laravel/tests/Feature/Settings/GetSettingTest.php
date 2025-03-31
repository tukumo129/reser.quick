<?php

namespace Tests\Feature\Settings;

use App\Models\Contract;
use App\Models\OpenTime;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/GetSettingTest.php
 */
class GetSettingTest extends TestCase
{
    use DatabaseTransactions;

    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $user->contract_id]);
        $openTimes = OpenTime::factory()->count(3)->create(['setting_id' => $setting->id]);

        $params = [];

        $response = $this->json('GET', '/api/setting', $params);
        $response->assertJson([
            'setting' => [
                'storeName' => $setting->store_name,
                'reserveSlotTime' => $setting->reserve_slot_time,
                'maxReserveNumber' => $setting->max_reserve_number,
                'reserveMonthsLimit' => $setting->reserve_months_limit,
                'openTimes' => [
                    [
                        'week' => $openTimes[0]->week,
                        'startTime' => $openTimes[0]->start_time,
                        'endTime' => $openTimes[0]->end_time,
                    ],
                    ['id' => $openTimes[1]->id],
                    ['id' => $openTimes[2]->id],
                ],
            ],
            'reserveSiteUrl' => env('APP_URL') . "/app/{$user->contract->uuid}",
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    public function testEmptySuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        $params = [];

        $response = $this->json('GET', '/api/setting', $params);
        $response->assertStatus(Response::HTTP_OK);
    }
}
