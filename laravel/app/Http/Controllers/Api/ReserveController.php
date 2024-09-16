<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reserves\CreateReserveRequest;
use App\Http\Requests\Reserves\GetReservesRequest;
use App\Http\Requests\Reserves\UpdateReserveRequest;
use App\Http\Resources\ReserveResource;
use App\Models\User;
use App\Services\ReserveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class ReserveController extends Controller
{
    protected ReserveService $reserveService;

    public function __construct(
        ReserveService $reserveService
    ) {
        $this->reserveService = $reserveService;
    }

    /**
     * @param int $reserveId
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
     * @param GetReservesRequest $request
     * @return Response
     */
    public function getReserves(GetReservesRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $sorts = $request->input('sorts', []);
        $page = $request->input('page');
        $limit = $request->input('limit');
        $reserves = $this->reserveService->getReserves($user->contract_id, $sorts, $page, $limit);
        return response()->json([
            'reserves' => ReserveResource::collection($reserves['reserves']),
            'pagination' => $reserves['pagination'] ?? null,
        ], Response::HTTP_OK);
    }

    /**
     * @param CreateReserveRequest $request
     * @return Response
     */
    public function createReserve(CreateReserveRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $reserveData = $request->input('reserve');
        $reserveData['contract_id'] = $user->contract_id;
        $reserveData['uuid'] = Str::uuid()->toString();
        $reserve = $this->reserveService->createReserve($reserveData);
        return response()->json([
            'reserve' => new ReserveResource($reserve),
        ], Response::HTTP_OK);
    }

    /**
     * @param int $reserveId
     * @param UpdateReserveRequest $request
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
     * @param int $reserveId
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
