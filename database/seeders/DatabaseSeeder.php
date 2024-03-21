<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Guard;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    private array $permissions = [
        [
            'name' => 'List roles',
            'uid' => 'role-list'
        ],
        [
            'name' => 'Create roles',
            'uid' => 'role-create'],
        [
            'name' => 'Edit roles',
            'uid' => 'role-edit'],
        [
            'name' => 'Delete roles',
            'uid' => 'role-delete'],
        [
            'name' => 'List products',
            'uid' => 'product-list'],
        [
            'name' => 'Create products',
            'uid' => 'product-create'],
        [
            'name' => 'Edit products',
            'uid' => 'product-edit'],
        [
            'name' => 'Delete products',
            'uid' => 'product-delete'],
    ];
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission['name'], 'uid' => $permission['uid']]);
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
        $permission = Permission::query()->where(['uid' => 'product-list', 'guard_name' => Guard::getDefaultName(Permission::class)])->get();
        $normalRole->syncPermissions($permission);
        $normalUser->assignRole([$normalRole->id]);
    }
}
