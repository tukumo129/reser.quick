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
     * @return Collection<Reserve>|null
     */
    public function getBy(array $criteria): ?Collection
    {
        $query = Reserve::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        return $query->get();
    }

    /**
     * 条件に基づいてデータを検索し、ページネーションを適用する場合にはその情報も提供する。
     * @param array<string, mixed> $criteria
     * @param array<string, string>|null $sorts
     * @return array<string, mixed>
     */
    public function getWithPagination(array $criteria, ?string $searchKey = null, array $sorts = [], ?int $page = 1, ?int $limit = 10): array
    {
        $query = Reserve::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }
        if ($searchKey) {
            $query->where('name', 'like', "%{$searchKey}%")
                ->orWhere('uuid')
                ->orWhere('reserve_id', 'like', "%{$searchKey}%");
        }

        foreach ($sorts as $column => $direction) {
            $query->orderBy($column, $direction);
        }

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
