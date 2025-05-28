<?php

namespace App\Http\Controllers\Api\App;

use App\Exceptions\ReserveNotAlloweException;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\Reserves\CreateAppReserveRequest;
use App\Http\Requests\App\Reserves\GetAppReserveAvailableDatesRequest;
use App\Http\Requests\App\Reserves\GetAppReserveAvailableTimesRequest;
use App\Services\ReserveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class AppReserveController extends Controller
{
    protected ReserveService $reserveService;

    public function __construct(
        ReserveService $reserveService
    ) {
        $this->reserveService = $reserveService;
    }

    public function getReserveAvailableDates(GetAppReserveAvailableDatesRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $date = $request->input('date');
        $availableDates = $this->reserveService->getMonthReserveAvailableDates($contract, $date);

        return response()->json([
            'availableDates' => $availableDates,
        ], Response::HTTP_OK);
    }

    public function getReserveAvailableTimes(GetAppReserveAvailableTimesRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $date = $request->input('date');
        $availableTimes = $this->reserveService->getReserveAvailableTimes($contract, $date);

        return response()->json([
            'availableTimes' => $availableTimes,
        ], Response::HTTP_OK);
    }

    public function createAppReserve(CreateAppReserveRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $setting = $contract->setting;
        $reserveData = $request->input('reserve');
        $reserveData['contract_id'] = $contract->id;
        $reserveSlotTime = $setting->reserve_slot_time ?? 60;
        $reserveData['end_date_time'] = Carbon::parse($reserveData['start_date_time'])->addMinutes((int) $reserveSlotTime)->format('Y-m-d H:i');
        $now = Carbon::now();

        $isBlockedByTimeLimit = $this->reserveService->checkTimeLimit($now, $setting, $reserveData['start_date_time']);
        if (! $isBlockedByTimeLimit) {
            throw new ReserveNotAlloweException;
        }
        $this->reserveService->createReserve($contract, $reserveData);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
