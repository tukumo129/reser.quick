<?php

namespace Tests\Feature\Users;

use App\Models\User;
use App\Notifications\PasswordReset;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

/**
 * php artisan test tests/Feature/Users/SendResetLinkEmailTest.php
 */
class SendResetLinkEmailTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    public function test_success()
    {
        Notification::fake();

        /** @var User $user */
        $user = User::factory()->create();

        $param = [
            'email' => $user->email,
        ];

        $response = $this->json('POST', '/api/password/forgot', $param);

        $response->assertStatus(200)
            ->assertJson(['status' => trans(Password::RESET_LINK_SENT)]);

        Notification::assertSentTo($user, PasswordReset::class);
    }
}
