<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

// 予約件数取得の期間
final class ReserveCountPeriod extends Enum
{
    public const DAY = 1; //1日
    public const WEEK = 2; //1週間
    public const MONTH = 3; //1か月
}
