<?php

namespace App\Repositories\Interfaces;

use App\Models\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    /**
     * @param int $id
     * @return User
     */
    public function find(int $id): User;

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<User>|null
     */
    public function findBy(array $criteria): ?Collection;

    /**
     * @param array<string, mixed> $criteria
     * @param array<string, string>|null $sorts
     * @param int|null $page
     * @param int|null $limit
     * @return array<string, mixed>
     */
    public function findWithPagination(array $criteria, array $sorts = [], ?int $page = 1, ?int $limit = 10): array;

    /**
     * @param array<string, mixed> $data
     * @return User
     */
    public function create(array $data): User;

    /**
     * @param int $id
     * @param array<string, mixed> $data
     * @return User
     */
    public function update(int $id, array $data): User;

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void;
}
