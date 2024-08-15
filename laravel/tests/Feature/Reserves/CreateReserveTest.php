<?php

namespace Tests\Feature\Reserves;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/CreateReserveTest.php
 */
class CreateReserveTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        $params = [
            'reserve' => [
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
            ],
        ];

        $response = $this->json('POST', '/api/reserve/', $params);
        $response->assertJson([
            'reserve' => [
                'id' => true,
                'contract_id' => $user->contract_id,
                'name' => '鈴木 一郎',
                'guest_number' => 1,
                'start_date_time' => '2024-01-02 12:34:56',
                'end_date_time' => '2024-01-02 13:34:56',
                'uuid' => true,
            ],
        ])->assertStatus(Response::HTTP_OK);
    }
}
