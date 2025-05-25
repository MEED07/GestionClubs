<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evenement;
use Illuminate\Support\Facades\Auth;

class EvenementController extends Controller
{
    // GET /admin-club/evenements
    public function mesEvenements()
    {
        $club = Auth::user()->club;

        if (!$club) {
            return response()->json(['message' => 'Aucun club associé à cet utilisateur'], 404);
        }

        return response()->json($club->evenements);
    }

    // POST /admin-club/evenements
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'lieu' => 'required|string',
        ]);

        $evenement = Evenement::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'date' => $request->date,
            'lieu' => $request->lieu,
            'club_id' => Auth::user()->club->id,
        ]);

        return response()->json($evenement, 201);
    }

    // PUT /admin-club/evenements/{id}
    public function update(Request $request, $id)
    {
        $evenement = Evenement::findOrFail($id);

        if ($evenement->club->admin_club_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'lieu' => 'required|string',
        ]);

        $evenement->update($request->only(['titre', 'description', 'date', 'lieu']));

        return response()->json($evenement);
    }

    // DELETE /admin-club/evenements/{id}
    public function destroy($id)
    {
        $evenement = Evenement::findOrFail($id);

        if ($evenement->club->admin_club_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $evenement->delete();

        return response()->json(['message' => 'Événement supprimé']);
    }
}

