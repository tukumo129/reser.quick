<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/UserLoginTest.php
 */
class UserLoginTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function test_success(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $password = '1234';

        /** @var User $user */
        $user = User::factory()->create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $params = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->json('POST', '/api/user/login', $params);
        $response->assertJson([
            'user' => [
                'id' => $user->id,
                'contractId' => $user->contract_id,
                'email' => $email,
            ],
            'token' => true,
        ])->assertStatus(Response::HTTP_OK);
    }

    /**
     * ログイン失敗時のテスト
     */
    public function test_login_failed(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $params = [
            'email' => $email,
            'password' => '1235',
        ];

        $response = $this->json('POST', '/api/user/login', $params);
        $response->assertjson([])->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
