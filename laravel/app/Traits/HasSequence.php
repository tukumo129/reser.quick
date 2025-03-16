<?php

namespace App\Traits;

use App\Models\Sequence;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\DB;

trait HasSequence
{
    /**
     * @param string $key
     * @return int
     */
    public function getNextSequence(string $key): int
    {
        return DB::transaction(function () use ($key) {
            $sequence = $this->sequences()->lockForUpdate()->firstOrCreate(
                ['key' => $key],
                ['sequence_number' => 0],
            );

            // シーケンス番号をインクリメント
            $sequence->increment('sequence_number');

            return $sequence->sequence_number;
        });
    }

    public function sequences(): MorphMany
    {
        return $this->MorphMany(Sequence::class, 'sequencable');
    }
}
