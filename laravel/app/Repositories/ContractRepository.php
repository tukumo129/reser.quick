<?php

namespace App\Repositories;

use App\Exceptions\ContractNotFoundException;
use App\Models\Contract;
use Illuminate\Support\Collection;

class ContractRepository
{
    public function get(int $id): Contract
    {
        $contract = Contract::get($id);
        if (!$contract) {
            throw new ContractNotFoundException("Contract with id {$id} not found.");
        }
        return $contract;
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<Contract>|null
     */
    public function getBy(array $criteria): ?Collection
    {
        $query = Contract::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Contract
    {
        $contract = new Contract();
        $contract->fill($data)->save();
        return $contract;
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(int $id, array $data): Contract
    {
        $contract = Contract::get($id);
        if (!$contract) {
            throw new ContractNotFoundException("Contract with id {$id} not found.");
        }
        $contract->fill($data)->save();
        return $contract;
    }

    public function delete(int $id): void
    {
        $contract = Contract::get($id);
        $contract->delete();
    }
}
