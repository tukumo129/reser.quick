<?php

namespace Tests\Feature\Users;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/CreateUserTest.php
 */
class CreateUserTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function test_success(): void
    {
        $email = $this->faker->unique()->safeEmail;

        $params = [
            'email' => $email,
            'password' => '1234',
        ];

        $response = $this->json('POST', '/api/user', $params);
        $response->assertJson([
            'user' => [
                'id' => true,
                'contractId' => true,
                'email' => $email,
            ],
            'token' => true,
        ])->assertStatus(Response::HTTP_OK);
    }
}
