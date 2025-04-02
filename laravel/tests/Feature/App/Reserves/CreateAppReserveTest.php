<?php

namespace Tests\Feature\App\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Contract;
use App\Models\Reserve;
use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Reserves/CreateAppReserveTest.php
 */
class CreateAppReserveTest extends TestCase
{
    use DatabaseTransactions;

    public function testSuccess(): void
    {
        $contract = Contract::factory()->create();

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34',
            ],
        ];

        $response = $this->json('POST', "/api/app/{$contract->uuid}/reserves", $params);
        $response->assertStatus(Response::HTTP_NO_CONTENT);

        $reserve = Reserve::orderby('id', 'desc')->first();
        $this->assertEquals($reserve->contract_id, $contract->id);
        $this->assertEquals($reserve->reserve_id, 'R00000001');
        $this->assertEquals($reserve->name, '鈴木 一郎');
        $this->assertEquals($reserve->guest_number, 1);
        $this->assertEquals($reserve->start_date_time, '2024-01-02 12:34');
        $this->assertEquals($reserve->end_date_time, '2024-01-02 13:34');
        $this->assertEquals($reserve->status, ReserveStatus::NO_COMPLETE);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    /**
     * 予約枠単位によって終了時間が変わることを確認
     */
    public function testAddSettingSuccess(): void
    {
        $contract = Contract::factory()->create();
        Setting::factory()->create(['contract_id' => $contract->id, 'reserve_slot_time' => 30]);

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34',
            ],
        ];

        $response = $this->json('POST', "/api/app/{$contract->uuid}/reserves", $params);
        $response->assertStatus(Response::HTTP_NO_CONTENT);

        $reserve = Reserve::orderby('id', 'desc')->first();
        $this->assertEquals($reserve->contract_id, $contract->id);
        $this->assertEquals($reserve->reserve_id, 'R00000001');
        $this->assertEquals($reserve->name, '鈴木 一郎');
        $this->assertEquals($reserve->guest_number, 1);
        $this->assertEquals($reserve->start_date_time, '2024-01-02 12:34');
        $this->assertEquals($reserve->end_date_time, '2024-01-02 13:04');
        $this->assertEquals($reserve->status, ReserveStatus::NO_COMPLETE);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
