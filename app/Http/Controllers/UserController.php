<?php

namespace App\Http\Controllers;

use App\Mail\UserCreated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:user-read|user-write', only: ['index', 'store']),
            new Middleware('permission:user-write', only: ['create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $userId = Auth::id();

        $users = User::orderBy('created_at', 'desc')
            ->where('id', '<>', $userId)
            ->where('created_by', '=', $userId)
            ->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
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

        DB::transaction(function () use ($request) {
            $roles = Role::find([$request->roles]);

            $password = Str::random();

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($password),
                'created_by' => $request->user()->id,
            ]);

            $assignedRoles = [];

            foreach ($roles as $role) {
                $assignedRoles[] = $role->id;
            }

            $user->assignRole($assignedRoles);

            Mail::to($user)->queue(new UserCreated($password));
        });

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
    public function edit(string $id): Response
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

        DB::transaction(function () use ($request, $id) {
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
        });

        return redirect(route('users.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect(route('users.index'));
    }
}
