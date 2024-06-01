<?php

namespace App\Http\Controllers;

use App\Models\Preset;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:project-read|project-write', only: ['index', 'store']),
            new Middleware('permission:project-write', only: ['create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $projects = Project::with('preset')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $presets = Preset::where('created_by', $request->user()->id)
            ->orWhereNull('created_by')
            ->get();

        return Inertia::render('Projects/Create', [
            'presets' => $presets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'detail' => 'required|string|max:1000',
            'preset' => 'required|numeric|exists:presets,id',
        ]);

        $project = new Project;

        $project->name = $request->name;
        $project->detail = $request->detail;
        $project->created_by = $request->user()->id;
        $project->preset_id = $request->preset;

        $project->save();

        return redirect(route('projects.index'));
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
    public function edit(Request $request, string $id): Response
    {
        $project = Project::with('preset')
            ->find($id);

        $presets = Preset::where('created_by', $request->user()->id)
            ->orWhereNull('created_by')
            ->get();

        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'presets' => $presets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'detail' => 'required|string|max:1000',
            'preset' => 'required|numeric|exists:presets,id',
        ]);

        $project = Project::find($id);

        Gate::authorize('update', $project);

        $project->name = $request->name;
        $project->detail = $request->detail;
        $project->preset_id = $request->preset;

        $project->save();

        return redirect(route('projects.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Gate::authorize('delete', $project);

        $project->delete();

        return redirect(route('projects.index'));
    }
}
