<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $store_setting_id
 * @property date $date
 * @property time $open_time
 * @property time $close_time
 */
class DayOpenTime extends Model
{
    use HasFactory;

    protected $table = 'day_open_times';

    protected $fillable = [
        'store_setting_id',
        'date',
        'open_time',
        'close_time',
    ];
}
