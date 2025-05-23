<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use App\Models\MembreClub;  // <-- Ajouté ici

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relation pour les clubs administrés
    public function clubsAdministres()
    {
        return $this->hasMany(Club::class, 'admin_club_id');
    }

    // Relation pour les clubs dont l'utilisateur est membre
    public function clubs()
    {
        return $this->belongsToMany(Club::class, 'membre_club');
    }

    // Relation pour les participations (événements)
    public function participations()
    {
        return $this->hasMany(Participation::class);
    }

    // Récupérer toutes les demandes d'adhésion en attente pour les clubs que cet utilisateur administre
    public function demandesAdhesionRecues()
    {
        return MembreClub::whereHas('club', function ($query) {
            $query->where('admin_club_id', $this->id);
        })->with(['user', 'club']);
    }
}
