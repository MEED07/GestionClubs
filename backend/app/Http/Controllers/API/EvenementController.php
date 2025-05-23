<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evenement;
use App\Models\Club;
use Illuminate\Support\Facades\Auth;

class EvenementController extends Controller
{
    public function index()
    {
        // Récupère l'ID de l'admin_club authentifié
        $adminId = auth()->id();

        // Filtre uniquement les événements qui lui appartiennent
        $evenements = Evenement::where('admin_club_id', $adminId)
                            ->orderBy('date_debut', 'asc')
                            ->get();

        return response()->json($evenements);
    }


    // Créer un nouvel événement

    public function store(Request $request, $clubId)
    {
        // 1️⃣ Validation (plus de club_id dans le body)
        $request->validate([
            'nom'         => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_debut'  => 'required|date',
            'date_fin'    => 'required|date|after_or_equal:date_debut',
            'lieu'        => 'required|string|max:255',
        ]);
    
        // 2️⃣ Création de l'événement
        $evenement = Evenement::create([
            'nom'            => $request->nom,
            'description'    => $request->description,
            'date_debut'     => $request->date_debut,
            'date_fin'       => $request->date_fin,
            'lieu'           => $request->lieu,
            'club_id'        => $clubId,         // ← on utilise l’ID de l’URL
            'admin_club_id'  => auth()->id(),    // ← ID de l’admin connecté
        ]);
    
        return response()->json($evenement, 201);
    }
    

    public function update(Request $request, $id)
    {
        // 🔐 Vérifie que l'événement appartient à l'admin connecté
        $evenement = Evenement::where('id', $id)
            ->where('admin_club_id', auth()->id())
            ->first();

        if (!$evenement) {
            return response()->json(['message' => "Événement non trouvé ou non autorisé"], 404);
        }

        // ✅ Validation
        $request->validate([
            'nom'         => 'required|string|max:255',
            'description' => 'nullable|string',
            'date_debut'  => 'required|date',
            'date_fin'    => 'required|date|after_or_equal:date_debut',
            'lieu'        => 'required|string|max:255',
            'club_id'     => 'required|exists:clubs,id',
        ]);

        // ✏️ Mise à jour
        $evenement->update([
            'nom'         => $request->nom,
            'description' => $request->description,
            'date_debut'  => $request->date_debut,
            'date_fin'    => $request->date_fin,
            'lieu'        => $request->lieu,
            'club_id'     => $request->club_id,
        ]);

        return response()->json($evenement);
    }


    public function destroy($id)
    {
        // 🔐 Vérifie que l'événement appartient à l'admin connecté
        $evenement = Evenement::where('id', $id)
            ->where('admin_club_id', auth()->id())
            ->first();

        if (!$evenement) {
            return response()->json(['message' => "Événement non trouvé ou non autorisé"], 404);
        }

        // 🗑️ Suppression
        $evenement->delete();

        return response()->json(['message' => "Événement supprimé avec succès"], 200);
    }

        
}
