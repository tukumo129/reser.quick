<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $contract_id
 * @property int|null $max_concurrent_reserve 同時予約可能数
 * @property string $reserve_slot_time 予約枠単位
 * @property string $default_stay_time 標準滞在時間
 * @property int|null $max_reserve_number 最大予約人数
 * @property int|null $reserve_months_limit 予約月数上限
 */
class ReserveSetting extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'reserve_settings';

    protected $fillable = [
        'contract_id',
        'max_concurrent_reserve',
        'reserve_slot_time',
        'default_stay_time',
        'max_reserve_number',
        'reserve_months_limit',
    ];
}
