<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $store_setting_id
 * @property int $week
 * @property time $open_time
 * @property time $close_time
 */
class WeekOpenTime extends Model
{
    use HasFactory;

    protected $table = 'week_open_times';

    protected $fillable = [
        'store_setting_id',
        'week',
        'open_time',
        'close_time',
    ];
}
