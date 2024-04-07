<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserRolePermissionSeeder extends Seeder
{
    private array $permissions = [
        [
            'title' => 'Get role',
            'name' => 'role-read',
        ],
        [
            'title' => 'Create role',
            'name' => 'role-write',
        ],
        [
            'title' => 'Get product',
            'name' => 'product-read',
        ],
        [
            'title' => 'Create product',
            'name' => 'product-write',
        ],
        [
            'title' => 'Get user',
            'name' => 'user-read',
        ],
        [
            'title' => 'Create user',
            'name' => 'user-write',
        ],
        [
            'title' => 'Get preset',
            'name' => 'preset-read',
        ],
        [
            'title' => 'Create preset',
            'name' => 'preset-write',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'title' => $permission['title']]);
        }

        $adminUser = User::create([
            'name' => 'Jithin',
            'email' => 'jithin@gmail.com',
            'password' => Hash::make('Abc123#'),
        ]);

        $adminRole = Role::create(['name' => 'Admin']);
        $permissions = Permission::all()->pluck('id', 'id')->all();
        $adminRole->syncPermissions($permissions);
        $adminUser->assignRole([$adminRole->id]);

        $normalUser = User::create([
            'name' => 'Kevin',
            'email' => 'kevin@gmail.com',
            'password' => Hash::make('Abc123#'),
        ]);

        $normalRole = Role::create(['name' => 'Normal']);
        $permission = Permission::query()->where(['name' => 'product-read', 'guard_name' => Guard::getDefaultName(Permission::class)])->get();
        $normalRole->syncPermissions($permission);
        $normalUser->assignRole([$normalRole->id]);
    }
}
