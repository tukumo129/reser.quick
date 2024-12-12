<?php

namespace App\Repositories;

use App\Exceptions\ContractNotFoundException;
use Illuminate\Support\Collection;
use App\Models\Contract;

class ContractRepository
{
    /**
     * @param int $id
     * @return Contract
     */
    public function find(int $id): Contract
    {
        $contract = Contract::find($id);
        if (!$contract) {
            throw new ContractNotFoundException("Contract with id {$id} not found.");
        }
        return $contract;
    }

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<Contract>|null
     */
    public function findBy(array $criteria): ?Collection
    {
        $query = Contract::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * @param array<string, mixed> $data
     * @return Contract
     */
    public function create(array $data): Contract
    {
        $contract = new Contract();
        $contract->fill($data)->save();
        return $contract;
    }

    /**
     * @param int $id
     * @param array<string, mixed> $data
     * @return Contract
     */
    public function update(int $id, array $data): Contract
    {
        $contract = Contract::find($id);
        if (!$contract) {
            throw new ContractNotFoundException("Contract with id {$id} not found.");
        }
        $contract->fill($data)->save();
        return $contract;
    }

    public function delete(int $id): void
    {
        $contract = Contract::find($id);
        $contract->delete();
    }
}
