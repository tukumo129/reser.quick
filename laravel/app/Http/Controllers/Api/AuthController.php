<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\ResetPasswordRequest;
use App\Http\Requests\Users\SendResetLinkEmailRequest;
use App\Http\Requests\Users\UserLoginRequest;
use App\Http\Resources\UserResource;
use App\Services\ContractService;
use App\Services\SettingService;
use App\Services\UserService;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    protected UserService $userService;

    protected ContractService $contractService;

    protected SettingService $settingService;

    public function __construct(
        UserService $userService,
        ContractService $contractService,
        SettingService $settingService
    ) {
        $this->userService = $userService;
        $this->contractService = $contractService;
        $this->settingService = $settingService;
    }

    public function createUser(CreateUserRequest $request): JsonResponse
    {
        // emailが既に登録されているか確認
        $user = $this->userService->getUserByEmail($request->input('email'));
        if ($user) {
            return response()->json([], Response::HTTP_CONFLICT);
        }

        $contractData = [
            'uuid' => Str::uuid()->toString(),
            'name' => '契約名', // TODO 53 仮で作成、契約自体をどう作るのか、ユーザーの紐づけをどうするか用検討
        ];
        $contract = $this->contractService->createContract($contractData);
        $this->settingService->updateOrCreateSetting($contract->id, []);

        $userData = [
            'contract_id' => $contract->id,
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ];

        $user = $this->userService->createUser($userData);
        $token = $user->createToken('AccessToken')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function userLogin(UserLoginRequest $request): JsonResponse
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = $this->userService->login($email, $password);
        if (! $user) {
            return response()->json([], Response::HTTP_UNAUTHORIZED);
        }
        $token = $user->createToken('AccessToken')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function userLogout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    public function sendResetLinkEmail(SendResetLinkEmailRequest $request)
    {
        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => __($status)])
            : response()->json(['error' => __($status)], 400);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['status' => __($status)])
            : response()->json(['error' => __($status)], 400);
    }
}
