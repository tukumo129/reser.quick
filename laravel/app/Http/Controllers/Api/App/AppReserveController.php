<?php

namespace App\Http\Controllers\Api\App;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\Reserves\CreateAppReserveRequest;
use App\Http\Requests\App\Reserves\GetAppReserveAvailableDatesRequest;
use App\Http\Requests\App\Reserves\GetAppReserveAvailableTimesRequest;
use App\Services\ReserveService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AppReserveController extends Controller
{
    protected ReserveService $reserveService;

    public function __construct(
        ReserveService $reserveService
    ) {
        $this->reserveService = $reserveService;
    }

    /**
     * @return Response
     */
    public function getReserveAvailableDates(GetAppReserveAvailableDatesRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $date = $request->input('date');
        $availableDates = $this->reserveService->getMonthReserveAvailableDates($contract, $date);

        return response()->json([
            'availableDates' => $availableDates,
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function getReserveAvailableTimes(GetAppReserveAvailableTimesRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $date = $request->input('date');
        $availableTimes = $this->reserveService->getReserveAvailableTimes($contract, $date);

        return response()->json([
            'availableTimes' => $availableTimes,
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function createAppReserve(CreateAppReserveRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $reserveData = $request->input('reserve');
        $reserveData['contract_id'] = $contract->id;
        $reserveData['end_date_time'] = Carbon::parse($reserveData['start_date_time'])->addMinutes($contract->setting->reserve_slot_time ?? 60)->format('Y-m-d H:i');

        $this->reserveService->createReserve($contract, $reserveData);
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
