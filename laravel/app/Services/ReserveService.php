<?php

namespace App\Services;

use App\Models\Reserve;
use App\Repositories\ReserveRepository;

class ReserveService
{
    protected ReserveRepository $reserveRepository;

    public function __construct(
        ReserveRepository $reserveRepository
    ) {
        $this->reserveRepository = $reserveRepository;
    }

    /**
     * @param int $contractId
     * @param int $reserveId
     * @return Reserve
     */
    public function getReserve(int $contractId, int $reserveId): Reserve
    {
        return $this->reserveRepository->find($contractId, $reserveId);
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
     * @param int $contractId
     * @param int $reserveId
     * @param array<string, mixed> $reserveData
     * @return Reserve
     */
    public function updateReserve(int $contractId, int $reserveId, array $reserveData): Reserve
    {
        return $this->reserveRepository->update($contractId, $reserveId, $reserveData);
    }

    /**
     * @param int $contractId
     * @param int $reserveId
     * @return void
     */
    public function deleteReserve(int $contractId, int $reserveId): void
    {
        $this->reserveRepository->delete($contractId, $reserveId);
    }
}
