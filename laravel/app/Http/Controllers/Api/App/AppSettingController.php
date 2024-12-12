<?php

namespace App\Http\Controllers\Api\App;

use App\Exceptions\ContractNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Resources\App\AppSettingResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AppSettingController extends Controller
{
    protected UserService $userService;

    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function getAppSettings(Request $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        if(!$contract->reserveSetting || !$contract->storeSetting) {
            throw new ContractNotFoundException($contract->id);
        }
        return response()->json([
            'settings' => new AppSettingResource($contract),
        ]);
    }
}
