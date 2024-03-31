<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use function Illuminate\Support\Str;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:user-list|user-create|user-edit|user-delete', only: ['index', 'store']),
            new Middleware('permission:user-create', only: ['create', 'store']),
            new Middleware('permission:user-edit', only: ['edit', 'update']),
            new Middleware('permission:user-delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'roles' => 'required|array|min:1',
            'roles.*' => 'int',
        ]);

        $roles = Role::find([$request->roles]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make(Str::random()),
        ]);

        $assignedRoles = [];

        foreach ($roles as $role) {
            $assignedRoles[] = $role->id;
        }

        $user->assignRole($assignedRoles);

        return redirect(route('users.index'));
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
    public function edit(string $id)
    {
        $roles = Role::all();

        $user = User::with('roles')->find($id);

        $assignedRoleIds = [];
        foreach ($user->roles as $role) {
            $assignedRoleIds[] = $role->id;
        }

        return Inertia::render('Users/Edit', [
            'roles' => $roles,
            'user' => $user,
            'assignedRoles' => $user->roles,
            'assignedRoleIds' => $assignedRoleIds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'roles' => 'required|array|min:1',
            'roles.*' => 'int',
        ]);

        $roles = Role::find([$request->roles]);

        $user = User::find($id);

        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();

        $assignedRoles = [];

        foreach ($roles as $role) {
            $assignedRoles[] = $role->id;
        }

        $user->syncRoles($assignedRoles);

        return redirect(route('users.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
