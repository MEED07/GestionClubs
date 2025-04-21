<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClubController;
use App\Http\Controllers\API\EvenementController;
use App\Http\Controllers\API\ParticipationController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Public Routes (no auth required)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/test', fn () => response()->json(['message' => 'Connexion API Laravel OK']));

/*
|--------------------------------------------------------------------------
| Authenticated Routes (auth:sanctum)
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn (Request $request) => $request->user());

    // Clubs & Événements accessibles à tous les utilisateurs connectés
    Route::apiResource('/clubs', ClubController::class);
    Route::apiResource('/evenements', EvenementController::class);

    // Participations (participant)
    Route::post('/participations', [ParticipationController::class, 'store']);
    Route::delete('/participations/{id}', [ParticipationController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Admin Général uniquement
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin_general')->group(function () {
        // Statistiques
        Route::get('/admin/statistiques', [AdminController::class, 'getStats']);

        // Gestion des utilisateurs
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // Modifier le rôle d’un utilisateur
        Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
    });

    /*
    |--------------------------------------------------------------------------
    | Participant uniquement
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:participant')->post('/evenement/{id}/participer', [EvenementController::class, 'participer']);

});
