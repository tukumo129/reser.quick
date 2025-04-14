<?php

namespace App\Repositories;

use App\Exceptions\ReserveNotFoundException;
use App\Models\Reserve;
use Illuminate\Support\Collection;

class ReserveRepository
{
    public function get(int $contractId, int $id): Reserve
    {
        $reserve = Reserve::where('contract_id', $contractId)->where('id', $id)->first();
        if (!$reserve) {
            throw new ReserveNotFoundException($id);
        }
        return $reserve;
    }

    /**
     * @param array<string, mixed> $criteria
     * @param array<string, mixed> $periodCriteria
     * @param array<string, string>|null $sorts
     * @return array<string, mixed>
     */
    public function getWithPagination(
        array $criteria,
        array $periodCriteria = [],
        ?string $searchKey = null,
        array $sorts = [],
        ?int $page = null,
        ?int $limit = null
    ): array {
        $query = Reserve::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        if ($searchKey) {
            $query->where('name', 'like', "%{$searchKey}%")
                ->orWhere('uuid')
                ->orWhere('reserve_id', 'like', "%{$searchKey}%");
        }
        if(isset($periodCriteria['start_date_time'], $periodCriteria['end_date_time'])) {
            $query->whereBetween('start_date_time', [$periodCriteria['start_date_time'], $periodCriteria['end_date_time']]);
        }

        foreach ($sorts as $column => $direction) {
            $query->orderBy($column, $direction);
        }

        if($page && $limit) {
            $paginator = $query->paginate($limit, ['*'], 'page', $page);

            return [
                'reserves' => $paginator->items(),
                'pagination' => [
                    'total' => $paginator->total(),
                    'last_page' => $paginator->lastPage(),
                    'page' => $paginator->currentPage(),
                ],
            ];
        }

        return [
            'reserves' => $query->get(),
            'pagination' => null,
        ];
    }

    /**
     * @param array<string, mixed> $criteria
     * @param array<string, mixed> $periodCriteria
     */
    public function getCount(
        array $criteria,
        array $periodCriteria = []
    ): int {
        $query = Reserve::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        if(isset($periodCriteria['start_date_time'], $periodCriteria['end_date_time'])) {
            $query->whereBetween('start_date_time', [$periodCriteria['start_date_time'], $periodCriteria['end_date_time']]);
        }
        return $query->count();
    }

    /**
     * @return Collection<Reserve>|null
     */
    public function getByStartDateTime(int $contractId, string $date, string $time): Collection
    {
        return Reserve::where('contract_id', $contractId)
            ->whereDate('start_date_time', $date)
            ->whereTime('start_date_time', $time)
            ->get();
    }

    /**
     * @param array<string, mixed> $data
     */
    public function create(array $data): Reserve
    {
        $reserve = new Reserve();
        $reserve->fill($data)->save();
        return $reserve;
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(int $contractId, int $id, array $data): Reserve
    {
        $reserve = $this->get($contractId, $id);
        if (!$reserve) {
            throw new ReserveNotFoundException($id);
        }
        $reserve->fill($data)->save();
        return $reserve;

    }

    public function delete(int $contractId, int $id): void
    {
        $reserve = $this->get($contractId, $id);
        $reserve->delete();
    }
}
