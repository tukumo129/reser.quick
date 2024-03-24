<?php

namespace App\Contracts\Interfaces;

use App\Models\Reserve;
use Illuminate\Support\Collection;

interface ReserveRepositoryInterface
{
    public function find(int $id): Reserve;
    public function findBy(array $criteria): ?Collection;
    public function create(array $data): Reserve;
    public function update(int $id, array $data): Reserve;
    public function delete(int $id): void;
}
