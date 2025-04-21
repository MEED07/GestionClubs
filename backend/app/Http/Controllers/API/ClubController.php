<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ClubController extends Controller
{
    public function index()
    {
        return Club::with('admin')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'admin_club_id' => 'required|exists:users,id',
            'logo' => 'nullable|image|max:2048',
        ]);
    
        // Vérifier que l'utilisateur sélectionné est bien un admin_club
        $admin = User::find($request->admin_club_id);
        if (!$admin || $admin->role !== 'admin_club') {
            return response()->json(['message' => 'admin_club_id invalide ou non autorisé'], 422);
        }
    
        $logoPath = null;
    
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }
    
        $club = Club::create([
            'nom' => $request->nom,
            'description' => $request->description,
            'logo' => $logoPath,
            'admin_club_id' => $request->admin_club_id, // maintenant c’est celui sélectionné dans le formulaire
        ]);
    
        return response()->json($club, 201);
    }

    public function show($id)
    {
        return Club::with('admin')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);

        $club->update($request->only(['nom', 'description']));

        return response()->json($club);
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();

        return response()->json(['message' => 'Club supprimé']);
    }
}
