<?php

namespace Tests\Feature\ReserveOptions;

use App\Models\ReserveOption;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/ReserveOptions/DeleteReserveOptionTest.php
 */
class DeleteReserveOptionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var ReserveOption $reserveoption */
        $reserveoption = ReserveOption::factory()->create(['contract_id' => $user->contract_id]);

        $response = $this->json('delete', "/api/reserves/options/{$reserveoption->id}", []);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertSoftDeleted('reserve_options', ['id' => $reserveoption->id]);
    }
}
