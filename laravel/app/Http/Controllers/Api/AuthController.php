<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserLoginRequest;
use App\Http\Requests\Users\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected UserService $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * @param UserRegisterRequest $request
     * @return Response
     */
    public function userRegister(UserRegisterRequest $request): JsonResponse
    {
        $userData = $request->input('user');
        $password = $userData['password'];
        $userData['password'] = Hash::make($password); // パスワードをハッシュ化した値で上書き

        $user = $this->userService->createUser($userData);
        $token = $user->createToken('AccessToken')->plainTextToken;
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], Response::HTTP_OK);
    }

    /**
     * @param UserLoginRequest $request
     * @return Response
     */
    public function userLogin(UserLoginRequest $request): JsonResponse
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = $this->userService->login($email, $password);
        if(!$user) {
            return response()->json([], Response::HTTP_UNAUTHORIZED);
        }
        $token = $user->createToken('AccessToken')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function userLogout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
