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
 * php artisan test tests/Feature/App/Reserves/GetReserveAvailableDatesTest.php
 */
class GetReserveAvailableDatesTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();

        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $contract->id, 'reserve_slot_time' => 60, 'max_available_reserve' => 3]);
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::WEEK, 'week' => DayOfWeek::Monday, 'start_time' => '01:00', 'end_time' => '02:00']);
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::WEEK, 'week' => DayOfWeek::Wednesday, 'start_time' => '03:00', 'end_time' => '05:00']);

        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::DAY, 'date' => '2024-01-04', 'start_time' => '06:00', 'end_time' => '08:00']); // 追加
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::DAY, 'date' => '2024-01-08', 'start_time' => '00:00', 'end_time' => '00:00']); // 削除
        OpenTime::factory()->create(['setting_id' => $setting->id, 'type' => OpenTimeType::DAY, 'date' => '2024-01-10', 'start_time' => '07:00', 'end_time' => '09:00']); // 変わりなし
        $params = [
            'date' => '2024-01',
        ];

        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-01 01:00']);
        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-03 03:00']);
        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-03 04:00']);
        Reserve::factory()->count(3)->create(['contract_id' => $contract->id, 'start_date_time' => '2024-01-17 03:00']);

        $response = $this->json('GET', "/api/app/{$contract->uuid}/reserves/dates", $params);
        $response->assertJson([
            'availableDates' => [
                ['date' => '2024-01-01', 'available' => false],
                ['date' => '2024-01-03', 'available' => false],
                ['date' => '2024-01-15', 'available' => true],
                ['date' => '2024-01-17', 'available' => true],
                ['date' => '2024-01-22', 'available' => true],
                ['date' => '2024-01-24', 'available' => true],
                ['date' => '2024-01-29', 'available' => true],
                ['date' => '2024-01-31', 'available' => true],
                ['date' => '2024-01-04', 'available' => true],
                ['date' => '2024-01-10', 'available' => true],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }
}
