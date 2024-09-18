<?php

namespace App\Models;

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

    protected $table = 'contracts';

    protected $fillable = [
        'uuid',
        'name',
    ];

    /**
     * @return HasOne
     */
    public function storeSetting(): HasOne
    {
        return $this->hasOne(StoreSetting::class);
    }

    /**
     * @return HasOne
     */
    public function reserveSetting(): HasOne
    {
        return $this->hasOne(ReserveSetting::class);
    }
}
