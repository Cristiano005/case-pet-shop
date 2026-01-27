<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use function Symfony\Component\Clock\now;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FreeSchedule>
 */
class FreeScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'day' => today()->tomorrow(),
            'hour' => '08:30',
            'status' => 0,
        ];
    }
}
