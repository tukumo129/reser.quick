<?php

namespace App\Models;

use App\Traits\HasSequence;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $contract_id
 * @property string $name
 * @property string $slot_time
 * @property int $price
 */
class ReserveOption extends Model
{
    use HasFactory;
    use HasSequence;
    use SoftDeletes;

    protected $table = 'reserve_options';

    protected $fillable = [
        'contract_id',
        'name',
        'slot_time',
        'price',
    ];
}
