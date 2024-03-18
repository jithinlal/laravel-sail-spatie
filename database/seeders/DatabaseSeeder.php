<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    private array $permissions = [
        'role-list',
        'role-create',
        'role-edit',
        'role-delete',
        'product-list',
        'product-create',
        'product-edit',
        'product-delete'
    ];
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminUser = User::create([
            'name' => 'Jithin',
            'email' => 'jithin@gmail.com',
            'password' => Hash::make('Abc123#')
        ]);

        $adminRole = Role::create(['name' => 'Admin']);
        $permissions = Permission::all()->pluck('id', 'id')->all();
        $adminRole->syncPermissions($permissions);
        $adminUser->assignRole([$adminRole->id]);

        $normalUser = User::create([
            'name' => 'Kevin',
            'email' => 'kevin@gmail.com',
            'password' => Hash::make('Abc123#')
        ]);

        $normalRole = Role::create(['name' => 'Normal']);
        $permission = Permission::findByName('product-list');
        $normalRole->syncPermissions([$permission]);
        $normalUser->assignRole([$normalRole->id]);
    }
}
