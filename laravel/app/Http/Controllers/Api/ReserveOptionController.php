<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ReserveOptionNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reserves\CreateReserveOptionRequest;
use App\Http\Requests\Reserves\GetReserveOptionsRequest;
use App\Http\Requests\Reserves\UpdateReserveOptionRequest;
use App\Http\Resources\ReserveOptionResource;
use App\Models\User;
use App\Repositories\ReserveOptionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ReserveOptionController extends Controller
{
    public function __construct(
        protected ReserveOptionRepository $reserveoptionRepository,
    ) {}

    public function getReserveOptions(GetReserveOptionsRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $searchKey = $request->input('search_key');
        $sorts = $request->input('sorts', []);
        $page = $request->input('page');
        $limit = $request->input('limit');
        $reserveOptions = $this->reserveoptionRepository->getWithPagination(['contract_id' => $user->contract_id], $searchKey, $sorts, $page, $limit);

        return response()->json([
            'reserveOptions' => ReserveOptionResource::collection($reserveOptions['reserve_optoins']),
            'pagination' => $reserveOptions['pagination'] ?? null,
        ], Response::HTTP_OK);
    }

    public function getReserveOption(int $optionId): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        $criteria = ['contract_id' => $user->contract_id, 'id' => $optionId];
        $reserveOptions = $this->reserveoptionRepository->getBy($criteria);
        $reserveOption = $reserveOptions->first();

        if (! $reserveOption) {
            throw new ReserveOptionNotFoundException("Reserve Option with id {$optionId} not found.");
        }

        return response()->json([
            'reserveOption' => new ReserveOptionResource($reserveOption),
        ], Response::HTTP_OK);
    }

    public function createReserveOption(CreateReserveOptionRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $reserveOptionData = $request->input('reserve_option', []);
        $reserveOptionData['contract_id'] = $user->contract_id;
        $reserveOption = $this->reserveoptionRepository->create($reserveOptionData);

        return response()->json([
            'reserveOption' => new ReserveOptionResource($reserveOption),
        ], Response::HTTP_CREATED);
    }

    public function updateReserveOption(int $reserveOptionId, UpdateReserveOptionRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $contractId = $user->contract_id;
        $reserveOptionData = $request->input('reserve_option', []);

        $reserveOption = $this->reserveoptionRepository->update($contractId, $reserveOptionId, $reserveOptionData);

        return response()->json([
            'reserveOption' => new ReserveOptionResource($reserveOption),
        ], Response::HTTP_OK);
    }

    public function deleteReserveOption(int $reserveOptionId): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $contractId = $user->contract_id;
        $this->reserveoptionRepository->delete($contractId, $reserveOptionId);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
