<?php

namespace App\Http\Controllers;

use App\constants\Roles;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:role-list|role-create', only: ['index', 'store']),
            new Middleware('permission:role-create', only: ['create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        $roles = Role::query()
            ->where('name', '<>', Roles::ADMIN)
            ->orderBy('id', 'DESC')
            ->paginate(50);

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        $permissions = Permission::all();

        return Inertia::render('Roles/Create', [
            'permissionList' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:20',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'int',
        ]);

        $role = new Role;

        $role->name = $request->name;
        $role->guard_name = 'web';

        $role->save();

        $permissions = Permission::query()->findMany($request->permissions);

        $role->syncPermissions($permissions);

        return redirect(route('roles.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): \Inertia\Response
    {
        $role = Role::findById($id);

        $permissionList = Permission::all();

        $rolePermissions = $role->permissions()->get(['id', 'name', 'title']);

        foreach ($permissionList as $item) {
            foreach ($rolePermissions as $rolePermission) {
                if ($item->id === $rolePermission->id) {
                    $item['included'] = true;
                }
            }
        }

        return Inertia::render('Roles/Edit', [
            'permissionList' => $permissionList,
            'role' => $role,
            'rolePermissions' => $rolePermissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:20',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'int',
        ]);

        $role = Role::findById($id);

        $role->name = $request->name;

        $role->save();

        $permissions = Permission::query()->findMany($request->permissions);

        $role->syncPermissions($permissions);

        return redirect(route('roles.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect(route('roles.index'));
    }
}
