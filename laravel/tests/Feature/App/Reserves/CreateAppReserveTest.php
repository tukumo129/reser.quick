<?php

namespace Tests\Feature\App\Reserves;

use App\Enums\ReserveStatus;
use App\Models\Contract;
use App\Models\Reserve;
use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/App/Reserves/CreateAppReserveTest.php
 */
class CreateAppReserveTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();
        Setting::factory()->create(['contract_id' => $contract->id, 'reserve_slot_time' => 60]);

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34',
            ],
        ];

        $response = $this->json('POST', "/api/app/{$contract->uuid}/reserves", $params);
        $response->assertStatus(Response::HTTP_NO_CONTENT);

        /** @var Reserve $reserve */
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
    public function test_add_setting_success(): void
    {
        /** @var Contract $contract */
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

        /** @var Reserve $reserve */
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

    /**
     * 時間的に予約できないことを確認
     */
    public function test_reserve_not_allowe_error(): void
    {
        /** @var Contract $contract */
        $contract = Contract::factory()->create();
        Setting::factory()->create([
            'contract_id' => $contract->id,
            'reserve_slot_time' => 30,
            'reserve_block_minutes' => 30,
            'max_available_reserve' => 3,
        ]);

        $now = Carbon::now();
        $dateTime = $now->copy()->addHours(1);
        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => $dateTime->format('Y-m-d H:i:s'),
            ],
        ];

        // 予約数がすでにいっぱいのため失敗
        Reserve::factory()->count(3)->create([
            'contract_id' => $contract->id,
            'start_date_time' => $dateTime,
        ]);
        $response = $this->json('POST', "/api/app/{$contract->uuid}/reserves", $params);
        $response->assertStatus(Response::HTTP_BAD_REQUEST);

        // 予約可能時間を過ぎているため失敗
        Reserve::query()->forceDelete();
        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => $now->format('Y-m-d H:i:s'),
            ],
        ];
        $response = $this->json('POST', "/api/app/{$contract->uuid}/reserves", $params);
        $response->assertStatus(Response::HTTP_BAD_REQUEST);
    }
}
