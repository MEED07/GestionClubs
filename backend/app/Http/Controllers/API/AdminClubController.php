<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\MembreClub;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminClubController extends Controller

{

    
    // Lister les clubs de l’admin
    public function mesClubs()
    {
        $clubs = Club::where('admin_club_id', auth()->id())->get();
        return response()->json($clubs);
    }

    // Afficher un club spécifique
    public function show($id)
    {
        $club = Club::where('admin_club_id', auth()->id())->findOrFail($id);
        return response()->json($club);
    }

    // Modifier les infos d’un club
    public function update(Request $request, $id)
    {
        $club = Club::where('admin_club_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'nom' => 'string|max:255',
            'description' => 'string|nullable',
            'logo' => 'string|nullable',
        ]);

        $club->update($validated);
        return response()->json(['message' => 'Club mis à jour avec succès.', 'club' => $club]);
    }



   public function demandesRecues(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Non authentifié'], 401);
        }

        $statut = $request->query('statut'); // Peut être null, 'en_attente', 'accepte', 'refuse'

        $query = MembreClub::whereHas('club', function ($q) use ($user) {
            $q->where('admin_club_id', $user->id);
        })->with(['user', 'club']);

        if ($statut) {
            $query->where('statut', $statut);
        }

        $demandes = $query->get();

        return response()->json($demandes);
    }


    public function accepterDemande($id)
    {
        $demande = DB::table('membre_club')->where('id', $id)->first();

        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        if ($demande->statut !== 'en_attente') {
            return response()->json(['message' => 'Demande déjà traitée'], 400);
        }

        DB::table('membre_club')->where('id', $id)->update([
            'statut' => 'accepte',
            'updated_at' => now()
        ]);

        User::where('id', $demande->user_id)->update(['role' => 'participant']);

        return response()->json(['message' => 'Demande acceptée avec succès']);
    }

    public function refuserDemande($id)
    {
        $demande = DB::table('membre_club')->where('id', $id)->first();

        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        if ($demande->statut !== 'en_attente') {
            return response()->json(['message' => 'Demande déjà traitée'], 400);
        }

        DB::table('membre_club')->where('id', $id)->update([
            'statut' => 'refuse',
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Demande refusée']);
    }

   public function supprimerDemande($id)
{
    return DB::transaction(function () use ($id) {
        // Récupérer la demande
        $demande = DB::table('membre_club')->where('id', $id)->first();

        if (!$demande) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        $userId = $demande->user_id; // Assure-toi que c'est bien le nom du champ

        // Supprimer la demande
        DB::table('membre_club')->where('id', $id)->delete();

        // Vérifie s'il reste encore des demandes acceptées
        $encoreParticipant = DB::table('membre_club')
            ->where('user_id', $userId)
            ->where('statut', 'accepte')
            ->exists();

        if (!$encoreParticipant) {
            DB::table('users') // ta table utilisateurs
                ->where('id', $userId)
                ->update(['role' => 'visiteur']);
        }

        return response()->json(['message' => 'Demande supprimée avec succès']);
    });
}




}
