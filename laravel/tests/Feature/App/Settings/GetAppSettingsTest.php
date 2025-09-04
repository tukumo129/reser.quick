<?php

namespace Tests\Feature\App\Settings;

use App\Models\Contract;
use App\Models\ReserveOption;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Settings/GetAppSettingsTest.php
 */
class GetAppSettingsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();

        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $contract->id]);
        /** @var Collection<int, ReserveOption> $reserveOptions */
        $reserveOptions = ReserveOption::factory()->count(2)->create(['contract_id' => $contract->id]);

        $params = [];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/auth", $params);
        $response->assertJson([
            'setting' => [
                'storeName' => $setting->store_name,
                'reserveSlotTime' => $setting->reserve_slot_time,
                'maxReserveNumber' => $setting->max_reserve_number,
                'reserveMonthsLimit' => $setting->reserve_months_limit,
                'reserveBlockMinutes' => $setting->reserve_block_minutes,
            ],
            'reserveOptions' => [
                [
                    'id' => $reserveOptions[0]->id,
                    'name' => $reserveOptions[0]->name,
                    'slotTime' => $reserveOptions[0]->slot_time,
                    'price' => $reserveOptions[0]->price,

                ],
            ],
        ]);
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_empty_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();

        $params = [];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/auth", $params);
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
