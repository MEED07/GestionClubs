<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Participation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ParticipationController extends Controller
{
    // GET /admin-club/participants
    public function mesParticipants()
    {
        $user = Auth::user();

        if (!$user->club) {
            return response()->json(['message' => 'Aucun club trouvé pour cet utilisateur'], 404);
        }

        $evenementIds = $user->club->evenements()->pluck('id');

        $participants = Participation::with(['user', 'evenement'])
            ->whereIn('evenement_id', $evenementIds)
            ->get();

        return response()->json($participants);
    }

    // PUT /admin-club/participants/{id}/statut
    public function updateStatut(Request $request, $id)
    {
        $participation = Participation::findOrFail($id);
        $evenement = $participation->evenement;

        if ($evenement->club->admin_club_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'statut' => 'required|string',
        ]);

        $participation->statut = $request->statut;
        $participation->save();

        return response()->json(['message' => 'Statut mis à jour']);
    }
}


