<?php

namespace Database\Seeders;

use App\Models\FreeSchedule;
use Illuminate\Database\Seeder;

class FreeScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FreeSchedule::factory(10)->create();
    }
}
