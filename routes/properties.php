<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Properties\UserController;
use App\Http\Controllers\Properties\PropertyController;
use App\Http\Controllers\Properties\DealController;

Route::get('/api/users', [UserController::class, 'index']); 
Route::get('/api/users/{id}', [UserController::class, 'show']);


Route::get('/api/properties', [PropertyController::class, 'index']); 
Route::get('/api/properties/{id}', [PropertyController::class, 'show']);


Route::get('/api/deals', [DealController::class, 'index']); 
Route::get('/api/deals/{id}', [DealController::class, 'show']);
