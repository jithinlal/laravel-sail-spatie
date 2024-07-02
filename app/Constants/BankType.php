<?php

namespace App\Constants;

enum BankType: int
{
    case BANK = 1;
    case CREDIT_CARD = 2;
    case UPI = 3;

    public static function values(): array
    {
        return [
            ['name' => 'Bank', 'value' => self::BANK->value],
            ['name' => 'Credit Card', 'value' => self::CREDIT_CARD->value],
            ['name' => 'UPI', 'value' => self::BANK->value],
        ];
    }
}
