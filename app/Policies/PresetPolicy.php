<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Preset;

class PresetPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Preset $preset): bool
    {
        return $preset->created_by === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Preset $preset): bool
    {
        return $preset->created_by === $user->id;
    }
}
