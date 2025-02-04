<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $setting_id
 * @property int $type
 * @property string|null $date
 * @property int|null $week
 * @property string|null $start_time
 * @property string|null $end_time
 * @property int|null $max_available_reserve
 */
class OpenTime extends Model
{
    use HasFactory;

    protected $table = 'open_times';

    protected $fillable = [
        'setting_id',
        'type',
        'date',
        'week',
        'start_time',
        'end_time',
        'max_available_reserve',
    ];
}
