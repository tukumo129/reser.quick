<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $contract_id
 * @property string $store_name 店舗名
 * @property string $reserve_slot_time 予約枠単位
 * @property int|null $max_reserve_number 最大予約人数
 * @property int|null $reserve_months_limit 予約月数上限
 * @property int|null $max_available_reserve 最大予約可能数
 */
class Setting extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'settings';

    protected $fillable = [
        'contract_id',
        'store_name',
        'reserve_slot_time',
        'max_reserve_number',
        'reserve_months_limit',
        'max_available_reserve',
    ];

    public function openTimes(): HasMany
    {
        return $this->hasMany(OpenTime::class);
    }
}
