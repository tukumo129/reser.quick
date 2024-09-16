<?php

namespace Tests\Feature\Settings;

use App\Models\Contract;
use App\Models\DayOpenTime;
use App\Models\StoreSetting;
use App\Models\User;
use App\Models\WeekOpenTime;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Settings/GetStoreSettingTest.php
 */
class GetStoreSettingTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');
        /** @var StoreSetting $storeSetting */
        $storeSetting = StoreSetting::factory()->create(['contract_id' => $user->contract_id]);
        $weekOpenTimes = WeekOpenTime::factory()->count(2)->create(['store_setting_id' => $storeSetting->id]);
        $dayOpenTimes = DayOpenTime::factory()->count(3)->create(['store_setting_id' => $storeSetting->id]);

        $params = [];

        $response = $this->json('GET', '/api/store_setting', $params);
        $response->assertJson([
            'storeSetting' => [
                'id' => $storeSetting->id,
                'storeName' => $storeSetting->store_name,
                'weekOpenTimes' => [
                    [
                        'id' => $weekOpenTimes[0]->id,
                        'week' => $weekOpenTimes[0]->week,
                        'openTime' => $weekOpenTimes[0]->open_time,
                        'closeTime' => $weekOpenTimes[0]->close_time,
                    ],
                    ['id' => $weekOpenTimes[1]->id],
                ],
                'dayOpenTimes' => [
                    [
                        'id' => $dayOpenTimes[0]->id,
                        'date' => $dayOpenTimes[0]->date,
                        'openTime' => $dayOpenTimes[0]->open_time,
                        'closeTime' => $dayOpenTimes[0]->close_time,
                    ],
                    ['id' => $dayOpenTimes[1]->id],
                    ['id' => $dayOpenTimes[2]->id],
                ],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    /**
     * @return void
     */
    public function testEmptySuccess(): void
    {
        $contract = Contract::factory()->create();
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contract->id]);
        $this->actingAs($user, 'web');

        $params = [];

        $response = $this->json('GET', '/api/store_setting', $params);
        $response->assertStatus(Response::HTTP_OK);
    }
}
