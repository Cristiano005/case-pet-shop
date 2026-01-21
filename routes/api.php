<?php

use App\Http\Controllers\Api\V1\AnimalController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/users', [UserController::class, 'store']);
Route::post('/animals', [AnimalController::class, 'store']);
