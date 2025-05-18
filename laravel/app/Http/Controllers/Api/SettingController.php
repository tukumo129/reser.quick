<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Models\User;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    protected SettingService $settingService;

    public function __construct(
        SettingService $settingService
    ) {
        $this->settingService = $settingService;
    }

    public function getSetting(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        if (! $user->contract) {
            return response()->json([], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'setting' => new SettingResource($user->contract->setting),
            'reserveSiteUrl' => config('app.front_url')."/app/{$user->contract->uuid}",
        ], Response::HTTP_OK);
    }

    public function updateSetting(UpdateSettingRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $settingData = $request->input('setting');
        $setting = $this->settingService->updateOrCreateSettingAndOpenTimes($user->contract_id, $settingData);

        return response()->json([
            'setting' => new SettingResource($setting),
        ], Response::HTTP_OK);
    }
}
