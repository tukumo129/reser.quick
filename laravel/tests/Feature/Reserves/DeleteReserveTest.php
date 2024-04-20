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

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contractId = 1;
        /** @var User $user */
        $user = User::factory()->create(['contract_id' => $contractId]);
        $this->actingAs($user, 'web');

        $reserve = Reserve::factory()->create(['contract_id' => $contractId]);

        $response = $this->json('delete', "/api/reserve/{$reserve->id}", []);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertSoftDeleted('reserves', ['id' => $reserve->id]);
    }
}
