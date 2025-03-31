<?php

namespace App\Services;

use App\Models\Contract;
use App\Repositories\ContractRepository;

class ContractService
{
    protected ContractRepository $contractRepository;

    public function __construct(
        ContractRepository $contractRepository
    ) {
        $this->contractRepository = $contractRepository;
    }

    /**
     * @param array<string, mixed> $contractData
     */
    public function createContract(array $contractData): Contract
    {
        return $this->contractRepository->create($contractData);
    }
}
