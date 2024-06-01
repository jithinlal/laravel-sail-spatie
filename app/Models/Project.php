<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'detail', 'created_by', 'preset_id',
    ];

    public function preset()
    {
        return $this->belongsTo(Preset::class, 'preset_id');
    }
}
