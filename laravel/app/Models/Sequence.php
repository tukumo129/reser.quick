<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @property int $sequencable_id
 * @property string $sequencable_type
 * @property int $sequence_number
 */
class Sequence extends Model
{
    use HasFactory;

    protected $table = 'sequences';

    public $timestamps = false;

    protected $fillable = [
        'sequencable_id',
        'sequencable_type',
        'key',
        'sequence_number',
    ];

    public function sequencable(): MorphTo
    {
        return $this->morphTo();
    }
}
