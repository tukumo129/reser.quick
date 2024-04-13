<?php

namespace App\Services;

use App\Models\Reserve;
use App\Repositories\Eloquent\EloquentReserveRepository;
use App\Repositories\Interfaces\ReserveRepositoryInterface;

class ReserveService
{
    protected ReserveRepositoryInterface $reserveRepository;

    public function __construct(
        EloquentReserveRepository $eloquentReserveRepository
    ) {
        $this->reserveRepository = $eloquentReserveRepository;
    }

    /**
     * @param int $reserveId
     * @return Reserve
     */
    public function getReserve(int $reserveId): Reserve
    {
        return $this->reserveRepository->find($reserveId);
    }

    /**
     * @param int $contractId
     * @param array<string, string>|null $sorts
     * @param int|null $page
     * @param int|null $limit
     * @return array<string, mixed>
     */
    public function getReserves(int $contractId, ?array $sorts, ?int $page, ?int $limit): array
    {
        $criteria = ['contract_id' => $contractId];

        if($page && $limit) {
            return $this->reserveRepository->findWithPagination($criteria, $sorts, $page, $limit);
        }

        $reserves = $this->reserveRepository->findBy($criteria);
        return [
            'reserves' => $reserves,
            'pagination' => null,
        ];
    }

    /**
     * @param array<string, mixed> $reserveData
     * @return Reserve
     */
    public function createReserve(array $reserveData): Reserve
    {
        return $this->reserveRepository->create($reserveData);
    }

    /**
     * @param int $reserveId
     * @param array<string, mixed> $reserveData
     * @return Reserve
     */
    public function updateReserve(int $reserveId, array $reserveData): Reserve
    {
        return $this->reserveRepository->update($reserveId, $reserveData);
    }

    /**
     * @param int $reserveId
     * @param array<string, mixed> $reserveData
     * @return void
     */
    public function deleteReserve(int $reserveId): void
    {
        $this->reserveRepository->delete($reserveId);
    }
}
