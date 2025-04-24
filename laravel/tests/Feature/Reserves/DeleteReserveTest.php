<?php

namespace Tests\Feature\Reserves;

use App\Models\Reserve;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Reserves/DeleteReserveTest.php
 */
class DeleteReserveTest extends TestCase
{
    use DatabaseTransactions;

    public function test_success(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $this->actingAs($user, 'web');

        /** @var Reserve $reserve */
        $reserve = Reserve::factory()->create(['contract_id' => $user->contract_id]);

        $response = $this->json('delete', "/api/reserve/{$reserve->id}", []);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertSoftDeleted('reserves', ['id' => $reserve->id]);
    }
}
