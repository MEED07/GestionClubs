<?php

namespace App\Http\Controllers\API;

use App\Models\Evenement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EvenementController extends Controller
{
    // Afficher la liste des événements
    public function index()
    {
        return Evenement::all();
    }

    // Afficher un événement spécifique
    public function show(Evenement $evenement)
    {
        return $evenement;
    }

    // Créer un événement
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'lieu' => 'required|string',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $evenement = Evenement::create($request->all());

        return response()->json($evenement, 201);
    }

    // Mettre à jour un événement
    public function update(Request $request, Evenement $evenement)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'lieu' => 'required|string',
        ]);

        $evenement->update($request->all());

        return response()->json($evenement);
    }

    // Supprimer un événement
    public function destroy(Evenement $evenement)
    {
        $evenement->delete();

        return response()->json(null, 204);
    }
}
