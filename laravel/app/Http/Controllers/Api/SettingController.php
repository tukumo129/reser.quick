<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateSettingRequest;
use App\Http\Requests\Settings\UpdateStoreSettingRequest;
use App\Http\Resources\StoreSettingResource;
use App\Models\User;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class SettingController extends Controller
{
    protected SettingService $settingService;

    public function __construct(
        SettingService $settingService
    ) {
        $this->settingService = $settingService;
    }

    /**
     * @param UpdateSettingRequest $request
     * @return Response
     */
    public function getStoreSetting(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $contract = $user->contract;
        $storeSetting = $contract->storeSetting;

        return response()->json([
            'storeSetting' => new StoreSettingResource($storeSetting),
        ], Response::HTTP_OK);
    }

    /**
     * @param UpdateSettingRequest $request
     * @return Response
     */
    public function updateStoreSetting(UpdateStoreSettingRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $settingData = $request->input('setting');
        $storeSetting = $this->settingService->updateOrCreateStoreSettings($user->contract_id, $settingData);
        return response()->json([
            'storeSetting' => new StoreSettingResource($storeSetting),
        ], Response::HTTP_OK);
    }
}
