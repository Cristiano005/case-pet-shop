<?php

use App\Http\Controllers\Api\V1\{AnimalController, AppointmentController, UserController, ServiceController, FreeScheduleController};
use Illuminate\Support\Facades\Route;

Route::get('/free-schedules', [FreeScheduleController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::post('/appointments', [AppointmentController::class, 'store']);

Route::controller(AnimalController::class)->group(function () {
    Route::get('/animals/user/{user:id}', [AnimalController::class, 'getAnimalsById']);
    Route::post('/animals', [AnimalController::class, 'store']);
});