<?php

namespace App\Repositories;

use App\Exceptions\ReserveOptionNotFoundException;
use App\Models\ReserveOption;
use Illuminate\Database\Eloquent\Collection;

class ReserveOptionRepository
{
    /**
     * @param  array<string, mixed>  $criteria
     * @return Collection<int, ReserveOption>
     */
    public function getBy(array $criteria): Collection
    {
        $query = ReserveOption::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }

        return $query->get();
    }

    /**
     * @param  array<string, mixed>  $criteria
     * @param  array<string, string>  $sorts
     * @return array<string, mixed>
     */
    public function getWithPagination(
        array $criteria,
        ?string $searchKey = null,
        array $sorts = [],
        ?int $page = null,
        ?int $limit = null
    ): array {
        $query = ReserveOption::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        if ($searchKey) {
            $query->where('name', 'like', "%{$searchKey}%");
        }

        foreach ($sorts as $column => $direction) {
            $query->orderBy($column, $direction);
        }

        if ($page && $limit) {
            $paginator = $query->paginate($limit, ['*'], 'page', $page);

            return [
                'reserve_optoins' => $paginator->items(),
                'pagination' => [
                    'total' => $paginator->total(),
                    'last_page' => $paginator->lastPage(),
                    'page' => $paginator->currentPage(),
                ],
            ];
        }

        return [
            'reserve_optoins' => $query->get(),
            'pagination' => null,
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): ReserveOption
    {
        $reserveOption = new ReserveOption;
        $reserveOption->fill($data)->save();

        return $reserveOption;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(int $contractId, int $id, array $data): ReserveOption
    {
        $reserveOption = $this->getBy(['contract_id' => $contractId, 'id' => $id])->first();
        if (! $reserveOption) {
            throw new ReserveOptionNotFoundException("Reserve Option with id {$id} not found.");
        }
        $reserveOption->fill($data)->save();

        return $reserveOption;
    }

    public function delete(int $contractId, int $id): void
    {
        /** @var ReserveOption|null $reserveOption */
        $reserveOption = $this->getBy(['contract_id' => $contractId, 'id' => $id])->first();
        $reserveOption?->delete();
    }
}
