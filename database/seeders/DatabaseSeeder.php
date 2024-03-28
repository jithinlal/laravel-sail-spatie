<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    private array $permissions = [
        [
            'title' => 'List roles',
            'name' => 'role-list',
        ],
        [
            'title' => 'Create roles',
            'name' => 'role-create',
        ],
        [
            'title' => 'Edit roles',
            'name' => 'role-edit',
        ],
        [
            'title' => 'Delete roles',
            'name' => 'role-delete',
        ],
        [
            'title' => 'List products',
            'name' => 'product-list',
        ],
        [
            'title' => 'Create products',
            'name' => 'product-create',
        ],
        [
            'title' => 'Edit products',
            'name' => 'product-edit',
        ],
        [
            'title' => 'Delete products',
            'name' => 'product-delete',
        ],
        [
            'title' => 'List users',
            'name' => 'user-list',
        ],
        [
            'title' => 'Create users',
            'name' => 'user-create',
        ],
        [
            'title' => 'Edit users',
            'name' => 'user-edit',
        ],
        [
            'title' => 'Delete users',
            'name' => 'user-delete',
        ],
    ];

    /**
     * Seed the application's database.
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
        $permission = Permission::query()->where(['name' => 'product-list', 'guard_name' => Guard::getDefaultName(Permission::class)])->get();
        $normalRole->syncPermissions($permission);
        $normalUser->assignRole([$normalRole->id]);
    }
}
