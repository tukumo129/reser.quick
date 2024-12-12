<?php

namespace Tests\Feature\App\Settings;

use App\Models\Contract;
use App\Models\ReserveSetting;
use App\Models\StoreSetting;
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

        /** @var ReserveSetting $reserveSetting */
        $reserveSetting = ReserveSetting::factory()->create(['contract_id' => $contract->id]);

        /** @var StoreSetting $storeSetting */
        $storeSetting = StoreSetting::factory()->create(['contract_id' => $contract->id]);

        $params = [];

        $response = $this->json('GET', "/api/app/{$contract->uuid}/auth", $params);
        $response->assertJson([
            'settings' => [
                'storeName' => $storeSetting->store_name,
                'maxConcurrentReserve' => $reserveSetting->max_concurrent_reserve,
                'reserveSlotTime' => $reserveSetting->reserve_slot_time,
                'defaultStayTime' => $reserveSetting->default_stay_time,
                'maxReserveNumber' => $reserveSetting->max_reserve_number,
                'reserveMonthsLimit' => $reserveSetting->reserve_months_limit,
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
