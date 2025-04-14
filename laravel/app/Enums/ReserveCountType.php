<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

// 予約件数取得のタイプ
final class ReserveCountType extends Enum
{
    public const HOURLY = 1; //時間単位
    public const DAILY = 2; //日単位
}
