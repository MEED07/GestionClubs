<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'logo',
        'admin_club_id',
    ];

    // L’admin du club
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_club_id');
    }
    
    // Les membres du club
    public function membres()
    {
        return $this->belongsToMany(User::class, 'membre_club');
    }

    // Les événements du club
    
    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }
    
    public function demandes()
    {
        return $this->hasMany(MembreClub::class);
    }
}
