<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateReserveSettingRequest;
use App\Http\Requests\Settings\UpdateSettingRequest;
use App\Http\Requests\Settings\UpdateStoreSettingRequest;
use App\Http\Resources\ReserveSettingResource;
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
     * @return JsonResponse
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
     * @param UpdateStoreSettingRequest $request
     * @return JsonResponse
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

    /**
     * @return JsonResponse
     */
    public function getReserveSetting(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $contract = $user->contract;
        $reserveSetting = $contract->reserveSetting;

        return response()->json([
            'reserveSetting' => new ReserveSettingResource($reserveSetting),
        ], Response::HTTP_OK);
    }

    /**
     * @param UpdateSettingRequest $request
     * @return JsonResponse
     */
    public function updateReserveSetting(UpdateReserveSettingRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $settingData = $request->input('setting');
        $reserveSetting = $this->settingService->updateOrCreateReserveSettings($user->contract_id, $settingData);
        return response()->json([
            'reserveSetting' => new ReserveSettingResource($reserveSetting),
        ], Response::HTTP_OK);
    }
}
