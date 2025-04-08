<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    AuthController,
    ClubController,
    EvenementController,
    ParticipationController,
    AdminController
};

Route::get('/', function () {
    return view('welcome');
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Groupes protégés par middleware "auth:sanctum"
Route::middleware('auth:sanctum')->group(function () {
    
    // Clubs
    Route::get('/clubs', [ClubController::class, 'index']);
    Route::get('/clubs/{id}', [ClubController::class, 'show']);
    Route::post('/clubs', [ClubController::class, 'store']);
    Route::put('/clubs/{id}', [ClubController::class, 'update']);
    Route::delete('/clubs/{id}', [ClubController::class, 'destroy']);

    // Événements
    Route::get('/evenements', [EvenementController::class, 'index']);
    Route::post('/evenements', [EvenementController::class, 'store']);
    Route::put('/evenements/{id}', [EvenementController::class, 'update']);
    Route::delete('/evenements/{id}', [EvenementController::class, 'destroy']);

    // Participation à un événement
    Route::post('/evenements/{id}/participer', [ParticipationController::class, 'participer']);
    Route::post('/evenements/{id}/quitter', [ParticipationController::class, 'quitter']);

    // Admin général
    Route::post('/admin/valider-admin-club', [AdminController::class, 'validerAdminClub']);
    Route::get('/admin/statistiques', [AdminController::class, 'statistiques']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
