<?php

namespace Database\Factories;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appoitment>
 */
class AppointmentFactory extends Factory
{
    private array $status = [
        'scheduled', 'completed', 'canceled'
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->randomElement(User::pluck('id')),
            'animal_id' => $this->faker->randomElement(Animal::pluck('id')),
            'appointment_date' => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'status' => $this->faker->randomElement($this->status),
        ];
    }
}
