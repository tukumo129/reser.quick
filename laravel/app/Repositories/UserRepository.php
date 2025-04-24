<?php

namespace App\Repositories;

use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository
{
    public function get(int $id): User
    {
        /** @var User|null $user */
        $user = User::find($id);
        if (! $user) {
            throw new UserNotFoundException($id);
        }

        return $user;
    }

    /**
     * @param  array<string, mixed>  $criteria
     * @return Collection<User>|null
     */
    public function getBy(array $criteria): ?Collection
    {
        $query = User::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }

        return $query->get();
    }

    /**
     * 条件に基づいてデータを検索し、ページネーションを適用する場合にはその情報も提供する。
     *
     * @param  array<string, mixed>  $criteria
     * @param  array<string, string>  $sorts
     * @return array<string, mixed>
     */
    public function getWithPagination(array $criteria, array $sorts = [], ?int $page = 1, ?int $limit = 10): array
    {
        $query = User::query();
        foreach ($criteria as $key => $value) {
            $query->where($key, $value);
        }

        foreach ($sorts as $column => $direction) {
            $query->orderBy($column, $direction);
        }

        $paginator = $query->paginate($limit, ['*'], 'page', $page);

        return [
            'user' => $paginator->items(),
            'pagination' => [
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
                'page' => $paginator->currentPage(),
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): User
    {
        $user = new User;
        $user->fill($data)->save();

        return $user;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(int $id, array $data): User
    {
        /** @var User|null $user */
        $user = User::find($id);
        if (! $user) {
            throw new UserNotFoundException($id);
        }
        $user->fill($data)->save();

        return $user;
    }

    public function delete(int $id): void
    {
        /** @var User $user */
        $user = User::find($id);
        $user->delete();
    }
}
