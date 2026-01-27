<?php

namespace Database\Seeders;

use App\Models\FreeSchedule;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Seeder;

class FreeScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $days = CarbonPeriod::create(today()->tomorrow(), today()->addDays(10))->filter(function(Carbon $day) {
            return !$day->isSaturday() && !$day->isSunday();
        });

        $allowedTimes = [
            '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '17:00', '17:30', '18:00'
        ];

        foreach ($days as $day) {
            foreach ($allowedTimes as $hour) {
                FreeSchedule::factory()->create([
                    'day' => $day->format('Y-m-d'),
                    'hour' => $hour,
                ]);
            }
        }

        FreeSchedule::where('id', '>', 10)->update([
            'status' => 1
        ]);
    }
}
