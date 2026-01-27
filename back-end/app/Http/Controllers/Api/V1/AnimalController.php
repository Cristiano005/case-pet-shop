<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\{ Animal, User };
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnimalController extends Controller
{
    public function getAnimalsById(User $user)
    {
        return response()->json([
            "data" => $user->animal()->get(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'specie' => ['required', 'string', 'max:100'],
            'breed' => ['required', 'string', 'max:100'],
            'sex' => ['required', 'string', Rule::in(['male', 'female'])],
            'age' => ['required', 'numeric', 'between:0,99.9'],
            'weight' => ['required', 'numeric', 'between:0,99.99'],
            'annotations' => ['nullable', 'string'],
        ]);

        $createdAnimal = Animal::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'specie' => $validated['specie'],
            'breed' => $validated['breed'],
            'sex' => $validated['sex'],
            'age' => $validated['age'],
            'weight' => $validated['weight'],
            'observations' => $validated['annotations'],
        ]);

        return response()->json([
            "data" => $createdAnimal,
            "success" => true,
            "message" => "Pet added successfully!",
        ], 201);
    }
}
