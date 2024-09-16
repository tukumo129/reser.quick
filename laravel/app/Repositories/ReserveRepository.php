<?php

namespace App\Repositories;

use App\Exceptions\ReserveNotFoundException;
use Illuminate\Support\Collection;
use App\Models\Reserve;

class ReserveRepository
{
    /**
     * @param int $contractId
     * @param int $id
     * @return Reserve
     */
    public function find(int $contractId, int $id): Reserve
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
    public function findBy(array $criteria): ?Collection
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
     * @param int|null $page
     * @param int|null $limit
     * @return array<string, mixed>
     */
    public function findWithPagination(array $criteria, array $sorts = [], ?int $page = 1, ?int $limit = 10): array
    {
        $query = Reserve::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
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
     * @param array<string, mixed> $data
     * @return Reserve
     */
    public function create(array $data): Reserve
    {
        $reserve = new Reserve();
        $reserve->fill($data)->save();
        return $reserve;
    }

    /**
     * @param int $contractId
     * @param int $id
     * @param array<string, mixed> $data
     * @return Reserve
     */
    public function update(int $contractId, int $id, array $data): Reserve
    {
        $reserve = $this->find($contractId, $id);
        if (!$reserve) {
            throw new ReserveNotFoundException($id);
        }
        $reserve->fill($data)->save();
        return $reserve;

    }

    /**
     * @param int $contractId
     * @param int $id
     * @return void
     */
    public function delete(int $contractId, int $id): void
    {
        $reserve = $this->find($contractId, $id);
        $reserve->delete();
    }
}
