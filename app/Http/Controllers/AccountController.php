<?php

namespace App\Http\Controllers;

use App\Constants\BankType;
use App\Models\Account;
use App\Models\Currency;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();
        $accounts = $user->accounts();
        $bankTypes = BankType::values();
        $currencies = Currency::all(['id', 'name', 'code']);

        return Inertia::render('Account/Index', [
            'accounts' => $accounts,
            'bankTypes' => $bankTypes,
            'currencies' => $currencies,
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
    public function show(Account $account)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        //
    }
}
