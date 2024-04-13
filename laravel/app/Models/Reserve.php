<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @param int $contract_id
 * @param string $name
 * @param int $guest_number
 * @param string $start_date_time
 * @param string $end_date_time
 * @param string $uuid
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
