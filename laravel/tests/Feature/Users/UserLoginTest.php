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
    use WithFaker;
    use DatabaseTransactions;

    public function testSuccess(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $password = '1234';

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
    public function testLoginFailed(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $password = '1234';

        $user = User::factory()->create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $params = [
            'email' => $email,
            'password' => '1235',
        ];

        $response = $this->json('POST', '/api/user/login', $params);
        $response->assertjson([])->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
