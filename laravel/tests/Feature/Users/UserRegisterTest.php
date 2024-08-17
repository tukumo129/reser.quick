<?php

namespace Tests\Feature\Users;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/UserRegisterTest.php
 */
class UserRegisterTest extends TestCase
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

        $params = [
            'user' => [
                'contract_id' => $contractId,
                'email' => $email,
                'password' => '1234',
            ],
        ];

        $response = $this->json('POST', '/api/user/register', $params);
        $response->assertJson([
            'user' => [
                'id' => true,
                'contract_id' => $contractId,
                'email' => $email,
            ],
            'token' => true,
        ])->assertStatus(Response::HTTP_OK);
    }
}
