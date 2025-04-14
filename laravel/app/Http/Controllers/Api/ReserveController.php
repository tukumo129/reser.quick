<?php

namespace App\Http\Controllers\Api;

use App\Enums\ReserveCountPeriod;
use App\Enums\ReserveCountType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reserves\CreateReserveRequest;
use App\Http\Requests\Reserves\GetReservesCountRequest;
use App\Http\Requests\Reserves\GetReservesRequest;
use App\Http\Requests\Reserves\UpdateReserveRequest;
use App\Http\Requests\Reserves\UpdateReserveStatusRequest;
use App\Http\Resources\ReserveResource;
use App\Models\User;
use App\Services\ReserveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ReserveController extends Controller
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
    public function getReserve(int $reserveId): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $reserve = $this->reserveService->getReserve($user->contract_id, $reserveId);

        return response()->json([
            'reserve' => new ReserveResource($reserve),
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function getReserves(GetReservesRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $criteria = $request->input('criteria', []);
        $periodCriteria = $request->input('period_criteria', []);
        $searchKey = $request->input('search_key');
        $sorts = $request->input('sorts', []);
        $page = $request->input('page');
        $limit = $request->input('limit');
        $reserves = $this->reserveService->getReserves($user->contract_id, $criteria, $periodCriteria, $searchKey, $sorts, $page, $limit);
        return response()->json([
            'reserves' => ReserveResource::collection($reserves['reserves']),
            'pagination' => $reserves['pagination'] ?? null,
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function getReservesCount(GetReservesCountRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $dateTime = $request->input('date_time');

        $dailyReserveCountPerHour = $this->reserveService->getReservesCount($user->contract_id, ReserveCountType::HOURLY, $dateTime, ReserveCountPeriod::DAY);
        $weeklyReserveCountPerDay = $this->reserveService->getReservesCount($user->contract_id, ReserveCountType::DAILY, $dateTime, ReserveCountPeriod::WEEK);
        $monthlyReserveCountPerDay = $this->reserveService->getReservesCount($user->contract_id, ReserveCountType::DAILY, $dateTime, ReserveCountPeriod::MONTH);

        return response()->json([
            'reservesCount' => [
                'dailyReserveCountPerHour' => $dailyReserveCountPerHour,
                'weeklyReserveCountPerDay' => $weeklyReserveCountPerDay,
                'monthlyReserveCountPerDay' => $monthlyReserveCountPerDay,
            ],
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function createReserve(CreateReserveRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $reserveData = $request->input('reserve');
        $reserveData['contract_id'] = $user->contract_id;
        $reserve = $this->reserveService->createReserve($user->contract, $reserveData);
        return response()->json([
            'reserve' => new ReserveResource($reserve),
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function updateReserve(int $reserveId, UpdateReserveRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $reserveData = $request->input('reserve');
        $reserve = $this->reserveService->updateReserve($user->contract_id, $reserveId, $reserveData);
        return response()->json([
            'reserve' => new ReserveResource($reserve),
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function updateReserveStatus(int $reserveId, UpdateReserveStatusRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $status = $request->input('status');
        $reserve = $this->reserveService->updateReserve($user->contract_id, $reserveId, ['status' => $status]);
        return response()->json([
            'reserve' => new ReserveResource($reserve),
        ], Response::HTTP_OK);
    }

    /**
     * @return Response
     */
    public function deleteReserve(int $reserveId): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $this->reserveService->deleteReserve($user->contract_id, $reserveId);
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
