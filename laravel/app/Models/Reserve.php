<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $contract_id
 * @property string $name
 * @property int $guest_number
 * @property string $start_date_time
 * @property string $end_date_time
 * @property string $uuid
 */
class Reserve extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'reserves';

    protected $fillable = [
        'contract_id',
        'name',
        'guest_number',
        'start_date_time',
        'end_date_time',
        'uuid',
    ];
}
