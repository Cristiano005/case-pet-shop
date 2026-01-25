<?php

use App\Http\Controllers\Api\V1\AnimalController;
use App\Http\Controllers\Api\V1\AppointmentController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ServiceController;
use Illuminate\Support\Facades\Route;

Route::get('animals/user/{user:id}', [AnimalController::class, 'getAnimalsById']);
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::post('/animals', [AnimalController::class, 'store']);
Route::post('/appointments', [AppointmentController::class, 'store']);