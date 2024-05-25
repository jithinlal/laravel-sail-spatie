<?php

namespace App\Http\Controllers;

use App\Models\Preset;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PresetController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:preset-read|preset-write', only: ['index', 'store']),
            new Middleware('permission:preset-write', only: ['create', 'store', 'edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $presets = Preset::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Presets/Index', [
            'presets' => $presets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Presets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'detail' => 'required|string|max:255',
        ]);

        $preset = new Preset;

        $preset->name = $request->name;
        $preset->detail = $request->detail;
        $preset->created_by = $request->user()->id;

        $preset->save();

        return redirect(route('presets.index'));
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
        $preset = Preset::find($id);

        return Inertia::render('Presets/Edit', [
            'preset' => $preset,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Preset $preset)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'detail' => 'required|string|max:255',
        ]);

        Gate::authorize('update', $preset);

        $preset->update($validated);

        return redirect(route('presets.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preset $preset)
    {
        Gate::authorize('delete', $preset);

        $preset->delete();

        return redirect(route('presets.index'));
    }
}
