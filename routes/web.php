<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('UsersPage');
})->name('home');

Route::get('/users', function () {
    return Inertia::render('UsersPage');
})->name('UsersPage');

Route::get('/properties', function () {
    return Inertia::render('ProperitesPage');
})->name('PropertiesPage');

Route::get('/transactions', function () {
    return Inertia::render('DealsPage');
})->name('transactions');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/properties.php';