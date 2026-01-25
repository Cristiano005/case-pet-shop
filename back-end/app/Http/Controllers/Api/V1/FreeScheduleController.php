<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FreeSchedule;
use Illuminate\Http\Request;

class FreeScheduleController extends Controller
{
    private array $comparasion = [
        "true" => 1,
        "false" => 0,
    ];

    public function index(Request $request)
    {
        $filter = $request->query('available');

        if ($filter === null) {
            return response()->json([
                "data" => FreeSchedule::all(['day', 'hour']),
                "sucess" => true,
            ], 200);
        }

        $schedules = FreeSchedule::where('status', $this->comparasion[$filter])->orderBy('hour')->get()->groupBy('day');

        return response()->json([
            "data" => $schedules,
            "sucess" => true,
        ], 200);
    }
}
