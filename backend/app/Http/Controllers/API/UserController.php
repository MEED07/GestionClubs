<?php
// app/Http/Controllers/API/UserController.php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    // Afficher tous les utilisateurs
    public function index()
    {
        // Vérifie si l'utilisateur est admin général
        if (auth()->user()->role !== 'admin_general') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Retourne la liste des utilisateurs
        return response()->json(User::all());
    }

    // Créer un utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|string',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        return response()->json($user, 201);
    }

    // Mettre à jour un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Valider et mettre à jour les données
        $user->update($request->only(['email', 'role']));

        return response()->json($user);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
