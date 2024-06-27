<?php

namespace App\Http\Controllers;

use App\Constants\Type;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $userId = auth()->id();

        $categories = Category::query()
            ->whereIn('type_id', [Type::INCOME, Type::EXPENSE])
            ->where('created_by', '=', null)
            ->orWhere('created_by', '=', $userId)
            ->orderBy('name', 'ASC')
            ->get();

        $incomeCategories = [];
        $expenseCategories = [];

        foreach ($categories as $category) {
            if ($category->type_id == Type::INCOME->value) {
                $incomeCategories[] = $category;
            } elseif ($category->type_id == Type::EXPENSE->value) {
                $expenseCategories[] = $category;
            }
        }

        return Inertia::render('Category/Index', [
            'incomeCategories' => $incomeCategories,
            'expenseCategories' => $expenseCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
