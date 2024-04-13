<?php

namespace App\Repositories\Eloquent;

use App\Exceptions\ReserveNotFoundException;
use Illuminate\Support\Collection;
use App\Models\Reserve;
use App\Repositories\Interfaces\ReserveRepositoryInterface;

class EloquentReserveRepository implements ReserveRepositoryInterface
{
    /**
     * @param int $id
     * @return Reserve
     */
    public function find(int $id): Reserve
    {
        $reserve = Reserve::find($id);
        if (!$reserve) {
            throw new ReserveNotFoundException("Store with id {$id} not found.");
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
                'current_page' => $paginator->currentPage(),
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
     * @param int $id
     * @param array<string, mixed> $data
     * @return Reserve
     */
    public function update(int $id, array $data): Reserve
    {
        $reserve = Reserve::find($id);
        if (!$reserve) {
            throw new ReserveNotFoundException("Reserve with id {$id} not found.");
        }
        $reserve->fill($data)->save();
        return $reserve;

    }

    public function delete(int $id): void
    {
        $reserve = Reserve::find($id);
        $reserve->delete();
    }
}
