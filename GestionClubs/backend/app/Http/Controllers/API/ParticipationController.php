<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Participation;
use App\Models\Evenement;

class ParticipationController extends Controller
{
    // Lister les demandes en attente
    public function demandes($evenementId)
    {
        $evenement = Evenement::with('club')->findOrFail($evenementId);
        $this->authorizeEvent($evenement);

        $demandes = Participation::where('evenement_id', $evenementId)
                                 ->where('statut', 'en attente')
                                 ->with('user')
                                 ->get();

        return response()->json($demandes);
    }

    // Accepter un participant
    public function accepter($id)
    {
        $participation = Participation::with('evenement.club')->findOrFail($id);
        $this->authorizeEvent($participation->evenement);

        $participation->update(['statut' => 'accepté']);
        return response()->json(['message' => 'Participant accepté']);
    }

    // Refuser un participant
    public function refuser($id)
    {
        $participation = Participation::with('evenement.club')->findOrFail($id);
        $this->authorizeEvent($participation->evenement);

        $participation->update(['statut' => 'refusé']);
        return response()->json(['message' => 'Participant refusé']);
    }

    private function authorizeEvent(Evenement $evenement)
    {
        if ($evenement->club->admin_club_id !== auth()->id()) {
            abort(403, 'Accès refusé');
        }
    }
}
