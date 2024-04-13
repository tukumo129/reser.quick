<?php

namespace App\Repositories\Interfaces;

use App\Models\Reserve;
use Illuminate\Support\Collection;

interface ReserveRepositoryInterface
{
    /**
     * @param int $id
     * @return Reserve
     */
    public function find(int $id): Reserve;

    /**
     * @param array<string, mixed> $criteria
     * @return Collection<Reserve>|null
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
     * @return Reserve
     */
    public function create(array $data): Reserve;

    /**
     * @param int $id
     * @param array<string, mixed> $data
     * @return Reserve
     */
    public function update(int $id, array $data): Reserve;

    /**
     * @param int $id
     * @return void
     */
    public function delete(int $id): void;
}
