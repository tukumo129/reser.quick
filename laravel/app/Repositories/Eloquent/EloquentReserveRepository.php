<?php

namespace App\Repositories;

use App\Contracts\Interfaces\ReserveRepositoryInterface;
use App\Exceptions\ReserveNotFoundException;
use Illuminate\Support\Collection;
use App\Models\Reserve;

class EloquentReserveRepository implements ReserveRepositoryInterface
{
    public function find(int $id): Reserve
    {
        $reserve = Reserve::find($id);
        if (!$reserve) {
            throw new ReserveNotFoundException("Store with id {$id} not found.");
        }

        return $reserve;
    }

    public function findBy(array $criteria): ?Collection
    {
        return Reserve::get();
    }

    public function create(array $data): Reserve
    {
        $reserve = new Reserve();
        return $reserve;
    }

    public function update(int $id, array $data): Reserve
    {
        $reserve = Reserve::find($id);
        if (!$reserve) {
            throw new ReserveNotFoundException("Reserve with id {$id} not found.");
        }
        return $reserve;

    }

    public function delete(int $id): void
    {
        $reserve = Reserve::find($id);
        $reserve->delete();
    }
}
