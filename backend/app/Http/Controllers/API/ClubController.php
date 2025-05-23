<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Club;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ClubController extends Controller
{
    public function index()
    {
        // Si l'utilisateur n'est pas connecté (visiteur public)
        if (!Auth::check()) {
            // Retourner tous les clubs avec les informations publiques
            return Club::with('admin')->get();
        }

        // Si l'utilisateur est admin général
        if (Auth::user()->role === 'admin_general') {
            return Club::with('admin')->get();
        }

        // Si l'utilisateur est admin de club
        if (Auth::user()->role === 'admin_club') {
            return Club::where('admin_club_id', Auth::id())->with('admin')->get();
        }

        // Pour tout autre utilisateur connecté → afficher les infos publiques uniquement
        return Club::select('id', 'nom', 'description', 'logo')->get();
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
            'admin_club_id' => $request->admin_club_id,
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

        // Vérifie si l'utilisateur connecté est l'admin du club
        if ($club->admin_club_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
            $club->logo = $logoPath;
        }

        $club->nom = $request->nom;
        $club->description = $request->description;
        $club->save();

        return response()->json($club);
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();

        return response()->json(['message' => 'Club supprimé']);
    }

    public function monClub($id)
    {
        $user = Auth::user();
    
        // Vérifie si l'utilisateur est l'admin du club
        $club = Club::with('admin')->where('id', $id)->where('admin_club_id', $user->id)->first();
    
        if (!$club) {
            return response()->json(['message' => 'Club non trouvé ou non autorisé'], 404);
        }
    
        return response()->json($club);
    }


    public function updateMonClub(Request $request, $id)
    {
        $club = Club::findOrFail($id);

        $club->nom = $request->input('nom');
        $club->description = $request->input('description');

        if ($request->hasFile('logo')) {
            // Supprime l'ancien logo s'il existe
            if ($club->logo && Storage::exists($club->logo)) {
                Storage::delete($club->logo);
            }

            // Stocke le nouveau logo
            $path = $request->file('logo')->store('logos', 'public');
            $club->logo = $path;
        }

        $club->save();

        return response()->json(['message' => 'Club mis à jour', 'club' => $club]);
    }
        

    public function supprimerMonClub($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();
    
        return response()->json(['message' => 'Club supprimé avec succès']);
    }
    
    
public function demanderAdhesion($clubId)
{
    $user = Auth::user();

    // ✅ Empêcher les admins de clubs d'envoyer une demande
    if ($user->role === 'admin_club') {
        return response()->json(['message' => 'Les administrateurs de club ne peuvent pas envoyer de demande.'], 403);
    }

    // Vérifie si une demande existe déjà
    $existe = DB::table('membre_club')
        ->where('user_id', $user->id)
        ->where('club_id', $clubId)
        ->exists();

    if ($existe) {
        return response()->json(['message' => 'Demande déjà envoyée ou déjà membre.'], 409);
    }

    // Crée une nouvelle demande
    DB::table('membre_club')->insert([
        'user_id' => $user->id,
        'club_id' => $clubId,
        'statut' => 'en_attente',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    return response()->json(['message' => 'Demande envoyée avec succès.']);
}


}
