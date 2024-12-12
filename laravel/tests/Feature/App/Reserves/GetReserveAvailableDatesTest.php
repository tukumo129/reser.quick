<?php

namespace Tests\Feature\App\Settings;

use App\Enums\DayOfWeek;
use App\Models\Contract;
use App\Models\DayOpenTime;
use App\Models\StoreSetting;
use App\Models\WeekOpenTime;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Reserves/GetReserveAvailableDatesTest.php
 */
class GetReserveAvailableDatesTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();

        /** @var StoreSetting $storeSetting */
        $storeSetting = StoreSetting::factory()->create(['contract_id' => $contract->id]);
        WeekOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'week' => DayOfWeek::Monday]);
        WeekOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'week' => DayOfWeek::Wednesday]);

        DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'date' => '2024-01-04', 'open_time' => '06:00', 'close_time' => '10:00']);
        DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'date' => '2024-01-08', 'open_time' => '00:00', 'close_time' => '00:00']);
        DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'date' => '2024-01-08', 'open_time' => '00:00', 'close_time' => '01:00']);
        DayOpenTime::factory()->create(['store_setting_id' => $storeSetting->id, 'date' => '2024-01-10', 'open_time' => '07:00', 'close_time' => '10:00']);
        $params = [
            'date' => '2024-01',
        ];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/reserves/dates", $params);
        $response->assertJson([
            'availableDates' => [
                "2024-01-01",
                "2024-01-03",
                "2024-01-10",
                "2024-01-15",
                "2024-01-17",
                "2024-01-22",
                "2024-01-24",
                "2024-01-29",
                "2024-01-31",
                "2024-01-04",
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
