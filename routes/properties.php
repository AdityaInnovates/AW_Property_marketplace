<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Properties\UserController;
use App\Http\Controllers\Properties\PropertyController;
use App\Http\Controllers\Properties\DealController;
use App\Http\Controllers\Properties\AgentController;
use App\Http\Controllers\Properties\OwnerController;
use App\Http\Controllers\Properties\BuyerController;
use App\Http\Controllers\Properties\AddressController;
use App\Http\Controllers\Properties\PropertyMediaController;

Route::resource('/api/users', UserController::class);

Route::resource('/api/properties', PropertyController::class);

Route::resource('/api/deals', DealController::class);

Route::resource('/api/agents', AgentController::class);

Route::post('/api/agent-create', [\App\Http\Controllers\Properties\AgentCreationController::class, 'store']);

Route::resource('/api/owners', OwnerController::class);

Route::resource('/api/buyers', BuyerController::class);

Route::resource('/api/addresses', AddressController::class);

Route::resource('/api/property-media', PropertyMediaController::class);

