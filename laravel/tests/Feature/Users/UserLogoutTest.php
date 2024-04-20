<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/UserLogoutTest.php
 */
class UserLogoutTest extends TestCase
{
    use WithFaker;
    use DatabaseTransactions;

    /**
     * @return void
     */
    public function testSuccess(): void
    {
        $contractId = 1;
        $email = $this->faker->unique()->safeEmail;
        $password = '1234';

        /** @var User $user */
        $user = User::factory()->create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);
        $token = $user->createToken('test-token')->plainTextToken;
        $params = [
            'user' => [
                'contract_id' => $contractId, // TODO factoryでcontractを作成するように修正
                'email' => $email,
                'password' => '1234',
            ],
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/user/logout', $params);
        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
