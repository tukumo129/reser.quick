<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $contract_id
 * @property string $store_name
 */
class StoreSetting extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'store_settings';

    protected $fillable = [
        'contract_id',
        'store_name',
    ];

    /**
     * @return HasMany
     */
    public function weekOpenTimes(): HasMany
    {
        return $this->hasMany(WeekOpenTime::class);
    }

    /**
     * @return HasMany
     */
    public function dayOpenTimes(): HasMany
    {
        return $this->hasMany(DayOpenTime::class);
    }
}
