<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'animal_id' => ['required', 'integer', 'exists:animals,id'],
            'appointment_date' => ['required', Rule::dateTime()],
            'status' => ['required', 'string', Rule::in(['scheduled', 'completed', 'canceled'])],
        ]);

        Appointment::create([
            'user_id' => $validated['user_id'],
            'animal_id' => $validated['animal_id'],
            'appointment_date' => $validated['appointment_date'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            "data" => [],
            "status" => true,
            "message" => "Appointment added successfully!",
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
