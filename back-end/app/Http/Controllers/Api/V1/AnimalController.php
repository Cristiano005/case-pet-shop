<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnimalController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer'],
            'specie' => ['required', 'string', 'max:100'],
            'breed' => ['required', 'string', 'max:100'],
            'sex' => ['required', 'string', Rule::in(['male', 'female'])],
            'age' => ['required', 'decimal:3,1'],
            'weight' => ['required', 'decimal:4,2'],
            'observations' => ['nullable', 'string'],
        ]);

        Animal::create([
            'user_id' => $validated['user_id'],
            'specie' => $validated['specie'],
            'breed' => $validated['breed'],
            'sex' => $validated['sex'],
            'age' => $validated['age'],
            'weight' => $validated['weight'],
            'observations' => $validated['observations'],
        ]);

        return response()->json([
            "data" => [],
            "status" => true,
            "message" => "Pet added successfully!",
        ], 200);
    }
}
