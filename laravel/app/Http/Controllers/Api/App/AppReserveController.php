<?php

namespace App\Http\Controllers\Api\App;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\Reserves\GetAppReserveAvailableDatesRequest;
use App\Services\ReserveService;
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
     * @param GetAppReserveAvailableDatesRequest $request
     * @param int $reserveId
     * @return Response
     */
    public function getReserveAvailableDates(GetAppReserveAvailableDatesRequest $request): JsonResponse
    {
        $contract = $request->attributes->get('contract');
        $date = $request->input('date');
        $availableDates = $this->reserveService->getReserveAvailableDates($contract, $date);

        return response()->json([
            'availableDates' => $availableDates,
        ], Response::HTTP_OK);
    }
}
