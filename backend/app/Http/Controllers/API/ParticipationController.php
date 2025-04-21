<?php

namespace App\Http\Controllers\API;

use App\Models\Participation;
use App\Models\Evenement;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ParticipationController extends Controller
{
    // Créer une participation
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'evenement_id' => 'required|exists:evenements,id',
        ]);

        $participation = Participation::create([
            'user_id' => $request->user_id,
            'evenement_id' => $request->evenement_id,
        ]);

        return response()->json($participation, 201);
    }

    // Supprimer une participation
    public function destroy($id)
    {
        $participation = Participation::findOrFail($id);
        $participation->delete();

        return response()->json(null, 204);
    }
}
