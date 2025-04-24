<?php

namespace Tests\Feature\App\Reserves;

use App\Enums\DayOfWeek;
use App\Enums\OpenTimeType;
use App\Models\Contract;
use App\Models\OpenTime;
use App\Models\Reserve;
use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Reserves/GetReserveAvailableTimesTest.php
 */
class GetReserveAvailableTimesTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();

        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $contract->id, 'reserve_slot_time' => 30, 'max_available_reserve' => 3]);
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::WEEK, 'week' => DayOfWeek::Monday, 'start_time' => '01:00', 'end_time' => '02:00']);
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::WEEK, 'week' => DayOfWeek::Monday, 'start_time' => '05:00', 'end_time' => '07:00']);
        $params = [
            'date' => '2024-01-01',
        ];

        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-01 01:00']);
        Reserve::factory()->count(2)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-01 01:30']);
        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-01 05:30']);
        Reserve::factory()->count(2)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-01 06:00']);

        $response = $this->json('GET', "/api/app/{$contract->uuid}/reserves/times", $params);
        $response->assertJson([
            'availableTimes' => [
                ['date' => '2024-01-01', 'startTime' => '01:00', 'endTime' => '01:30', 'available' => false],
                ['date' => '2024-01-01', 'startTime' => '01:30', 'endTime' => '02:00', 'available' => true],
                ['date' => '2024-01-01', 'startTime' => '05:00', 'endTime' => '05:30', 'available' => true],
                ['date' => '2024-01-01', 'startTime' => '05:30', 'endTime' => '06:00', 'available' => false],
                ['date' => '2024-01-01', 'startTime' => '06:00', 'endTime' => '06:30', 'available' => true],
                ['date' => '2024-01-01', 'startTime' => '06:30', 'endTime' => '07:00', 'available' => true],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
