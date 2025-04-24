<?php

namespace App\Http\Controllers\Api\App;

use App\Exceptions\ContractNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Resources\App\AppSettingResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppSettingController extends Controller
{
    protected UserService $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    public function getAppSettings(Request $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        if (! $contract->setting) {
            throw new ContractNotFoundException($contract->id);
        }

        return response()->json([
            'setting' => new AppSettingResource($contract->setting),
        ]);
    }
}
