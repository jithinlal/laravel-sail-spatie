<?php

namespace Database\Seeders;

use App\Constants\BankType;
use App\Models\Account;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::create([
            'name' => 'Bank',
            'type' => BankType::BANK->value,
            'balance' => 0,
            'currency' => 1,
        ]);
    }
}
