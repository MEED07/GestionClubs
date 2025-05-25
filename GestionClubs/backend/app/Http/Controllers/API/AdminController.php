<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    // Mettre à jour le rôle d'un utilisateur
    
    public function updateUserRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:visiteur,participant,admin_club,admin_general'
        ]);

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => 'Rôle mis à jour avec succès',
            'user' => $user
        ]);
    }
}
