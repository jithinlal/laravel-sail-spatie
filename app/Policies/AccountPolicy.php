<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\User;

class AccountPolicy
{
    /**
     * Determine whether a user can update the model.
     */
    public function update(User $user, Account $account): bool
    {
        return $account->created_by === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Account $account): bool
    {
        return $account->created_by === $user->id;
    }
}
