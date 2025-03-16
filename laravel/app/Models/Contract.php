<?php

namespace App\Models;

use App\Traits\HasSequence;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $uuid
 * @property string $name
 */
class Contract extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasSequence;

    protected $table = 'contracts';

    protected $fillable = [
        'uuid',
        'name',
    ];

    /**
     * @return HasOne<Setting>
     */
    public function setting(): HasOne
    {
        return $this->hasOne(Setting::class);
    }
}
