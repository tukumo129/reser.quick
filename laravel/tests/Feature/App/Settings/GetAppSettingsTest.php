<?php

namespace Tests\Feature\App\Settings;

use App\Models\Contract;
use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Settings/GetAppSettingsTest.php
 */
class GetAppSettingsTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();

        /** @var Setting $setting */
        $setting = Setting::factory()->create(['contract_id' => $contract->id]);

        $params = [];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/auth", $params);
        $response->assertJson([
            'setting' => [
                'storeName' => $setting->store_name,
                'reserveSlotTime' => $setting->reserve_slot_time,
                'maxReserveNumber' => $setting->max_reserve_number,
                'reserveMonthsLimit' => $setting->reserve_months_limit,
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

        $params = [];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/auth", $params);
        $response->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
