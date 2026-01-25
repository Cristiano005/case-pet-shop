<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use function Symfony\Component\Clock\now;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FreeSchedule>
 */
class FreeScheduleFactory extends Factory
{
    private $allowedTimes = [
        "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "17:00", "17:30", "18:00"
    ];    

    public function definition(): array
    {
        return [
            "day" => today()->tomorrow(),
            "hour" => $this->faker->unique()->randomElement($this->allowedTimes),
        ];
    }
}
