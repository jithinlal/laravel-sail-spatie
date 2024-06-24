<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Type::insert(
            [
                [
                    'name' => 'Income',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Expense',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Transfer',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]
        );
    }
}
