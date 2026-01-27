<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\FreeSchedule;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    private ?FreeSchedule $freeScheduleModelInstance = null;

    public function __construct()
    {
        $this->freeScheduleModelInstance = new FreeSchedule();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'animal_id' => ['required', 'integer', 'exists:animals,id'],
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'day' => ['required', 'string', Rule::dateTime()->format('Y-m-d')],
            'hour' => ['required', 'string', Rule::dateTime()->format('H:i:s')],
            'status' => ['required', 'string', Rule::in(['scheduled', 'completed', 'canceled'])],
            'annotations' => ['nullable', 'string'],
        ]);

        try {

            $result = DB::transaction(function () use ($request, $validated) {

                $isScheduleExists = $this->freeScheduleModelInstance->where('day', $request->input('day'))
                    ->where('hour', $request->input('hour'))
                    ->where('status', 1)
                    ->lockForUpdate()
                    ->first('id');

                if (!$isScheduleExists) {
                    throw new Exception("Date and hour unavailable!");
                }

                $newAppointment = Appointment::create([
                    'user_id' => $validated['user_id'],
                    'animal_id' => $validated['animal_id'],
                    'service_id' => $validated['service_id'],
                    'free_schedule_id' => $isScheduleExists['id'],
                    'status' => $validated['status'],
                    'price' => Service::find($validated['service_id'])->price,
                    'observations' => $validated['annotations'] ?? '',
                ]);

                $isScheduleExists->update([
                    'status' => 0
                ]);

                return $newAppointment;
            });

            return response()->json([
                "data" => $result,
                "status" => true,
                "message" => "Appointment added successfully!",
            ], 201);

        } catch (Exception $error) {
            return response()->json([
                "data" => [],
                "status" => false,
                "message" => $error->getMessage(),
            ], 500);
        }
    }
}
