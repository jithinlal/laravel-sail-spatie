<?php

namespace Database\Seeders;

use App\Models\Preset;
use Illuminate\Database\Seeder;

class PresetSeeder extends Seeder
{
    private array $presets = [
        [
            'name' => 'Villa',
            'detail' => 'A big house project specifically linked to a single customer.',
        ],
        [
            'name' => 'Flats',
            'detail' => 'A group of house projects specifically linked to multiple customers.',
        ],
        [
            'name' => 'Custom',
            'detail' => 'Any other kind of development projects for a customer.',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->presets as $preset) {
            Preset::create(['name' => $preset['name'], 'detail' => $preset['detail']]);
        }
    }
}
