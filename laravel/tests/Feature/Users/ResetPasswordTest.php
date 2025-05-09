<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/ResetPasswordTest.php
 */
class ResetPasswordTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function test_success()
    {
        Notification::fake();

        /** @var User $user */
        $user = User::factory()->create();
        $token = Password::createToken($user);
        $newPassword = 'new-secure-password';

        $param = [
            'email' => $user->email,
            'token' => $token,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ];

        $response = $this->json('POST', '/api/password/reset', $param);

        $response->assertStatus(200)
            ->assertJson(['status' => trans(Password::PASSWORD_RESET)]);

        $this->assertTrue(
            Hash::check($newPassword, $user->fresh()->password),
            'The password was not updated correctly.'
        );
    }

    public function test_invalid_token_error()
    {
        /** @var User $user */
        $user = User::factory()->create();

        $param = [
            'email' => $user->email,
            'token' => 'invalid-token',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->json('POST', '/api/password/reset', $param);

        $response->assertStatus(400)
            ->assertJson(['error' => trans(Password::INVALID_TOKEN)]);
    }
}
