<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FreeSchedule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FreeScheduleController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'available' => [
                'nullable',
                Rule::in(['true', 'false'])
            ],
        ]);

        $filter = $validated['available'] ?? null;

        if ($filter === null) {
            return response()->json([
                "data" => FreeSchedule::all(['day', 'hour']),
            ], 200);
        }

        $status = ($filter === 'true') ? 1 : 0;

        $schedules = FreeSchedule::where('status', $status)->
            orderBy('day')->orderBy('hour')
                ->get()->groupBy('day');
                
        $formattedSchedules = $schedules->map(fn($dates) => $dates->pluck('hour'));

        return response()->json([
            "data" => $formattedSchedules->toArray(),
        ], 200);
    }
}
