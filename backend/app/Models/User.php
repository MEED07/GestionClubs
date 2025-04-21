<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use  HasFactory, Notifiable;
    use HasApiTokens;

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

    // Un admin_club peut gérer plusieurs clubs
    public function clubsAdministres()
    {
        return $this->hasMany(Club::class, 'admin_club_id');
    }

    // Un utilisateur peut être membre de plusieurs clubs
    public function clubs()
    {
        return $this->belongsToMany(Club::class, 'membre_club');
    }

    // Un utilisateur peut participer à plusieurs événements
    public function participations()
    {
        return $this->hasMany(Participation::class);
    }
}
