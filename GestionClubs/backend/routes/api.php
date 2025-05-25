<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClubController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\UserController;
use App\Models\User;

use App\Http\Controllers\API\AdminClubController;
use App\Http\Controllers\API\EvenementController;
use App\Http\Controllers\API\ParticipationController;

/*
|--------------------------------------------------------------------------
| Public Routes (No Auth Required)
|--------------------------------------------------------------------------
*/
Route::get('/test', fn () => response()->json(['message' => 'Connexion API Laravel OK']));
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/clubs', [ClubController::class, 'index']);


/*
|--------------------------------------------------------------------------
| Authenticated Routes (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn (Request $request) => $request->user());

    /*
    |--------------------------------------------------------------------------
    | Clubs & Événements accessibles à tous les utilisateurs connectés
    |--------------------------------------------------------------------------
    */
    Route::apiResource('/evenements', EvenementController::class)->except(['create', 'edit']);
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

        // Gestion des clubs
        Route::post('/clubs', [ClubController::class, 'store']);

        // Gestion des utilisateurs
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Club uniquement 
    |--------------------------------------------------------------------------
    */
    // routes/api.php
    
    Route::middleware('auth:sanctum')->group(function () {

        // Routes pour les clubs
        Route::get('/admin/club/{id}', [ClubController::class, 'monClub']);  // Voir détail du club
        Route::put('/admin/club/{id}', [ClubController::class, 'updateMonClub']);  // Modifier club
        Route::delete('/admin/club/{id}', [ClubController::class, 'supprimerMonClub']); // Supprimer club
        
        Route::post('/clubs/{id}/demander-adhesion', [ClubController::class, 'demanderAdhesion']); //gestion des demmandes
        Route::get('/admin/demandes', [AdminClubController::class, 'demandesRecues']);
        Route::post('/admin/demandes/{id}/accepter', [AdminClubController::class, 'accepterDemande']);
        Route::post('/admin/demandes/{id}/refuser', [AdminClubController::class, 'refuserDemande']);
        Route::delete('/admin/demandes/{id}/supprimer', [AdminClubController::class, 'supprimerDemande']);


            
        // Routes pour la gestion des événements d'un club
        Route::post('/admin/club/{club}/evenements', [EvenementController::class, 'store']); // Créer un événement
        Route::get('/admin_club/evenements', [EvenementController::class, 'index']);
        Route::put('/admin/evenements/{id}', [EvenementController::class, 'update']);
        Route::delete('/admin/evenements/{id}', [EvenementController::class, 'destroy']);
      


    });
    
    // Autres routes pour la gestion des clubs et utilisateur
    Route::middleware('auth:sanctum')->get('/admin/clubs', [ClubController::class, 'index']); // Voir la liste des clubs
    Route::middleware('auth:sanctum')->get('/user/club', function () {
        $user = auth()->user();
        return $user->club;  // Retourne le club auquel l'utilisateur appartient
    });

    /*
    |--------------------------------------------------------------------------
    | Participant uniquement
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:participant')->post('/evenement/{id}/participer', [EvenementController::class, 'participer']);
});
