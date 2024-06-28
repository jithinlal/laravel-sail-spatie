<?php

namespace App\Constants;

enum BankType: int
{
    case BANK = 1;
    case CREDIT_CARD = 2;
    case UPI = 3;
}
