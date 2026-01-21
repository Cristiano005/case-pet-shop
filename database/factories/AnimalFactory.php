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
            'specie' => $this->faker->randomElement($this->animals),
            'breed' => $this->faker->randomElement($this->breeds),
        ];
    }
}
