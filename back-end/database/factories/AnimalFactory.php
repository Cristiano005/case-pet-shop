<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalFactory extends Factory
{
    private array $animals = [
        "cat", "dog", "rabbit"
    ];

    private array $breeds = [
        "Maine Coon", "Golden Retriever", "Holland Lop"
    ];

    public function definition(): array
    {
        return [
            'user_id' => $this->faker->randomElement(User::pluck('id')),
            'name' => $this->faker->name(),
            'specie' => $this->faker->randomElement($this->animals),
            'breed' => $this->faker->randomElement($this->breeds),
            'sex' => $this->faker->randomElement(['male', 'female']),
            'age' => $this->faker->randomFloat(1, 0, 15),
            'weight' => $this->faker->randomFloat(2, 0, 30),
            'observations' => $this->faker->text(250),
        ];
    }
}
