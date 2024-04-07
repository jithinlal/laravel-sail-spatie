<?php

namespace App\Http\Controllers;

use App\Models\Preset;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class PresetController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:preset-read|preset-write', only: ['index', 'store']),
            new Middleware('permission:preset-write', only: ['create', 'store']),
            new Middleware('permission:preset-write', only: ['edit', 'update']),
            new Middleware('permission:preset-write', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $presets = Preset::all();

        return Inertia::render('Presets/Index', [
            'presets' => $presets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
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

        $preset = Preset::create($validated);

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
    public function edit(string $id)
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

        $preset->update($validated);

        return redirect(route('presets.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preset $preset)
    {
        $preset->delete();

        return redirect(route('presets.index'));
    }
}
