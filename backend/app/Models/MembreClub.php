<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembreClub extends Model
{
    use HasFactory;

    protected $table = 'membre_club';

    protected $fillable = [
        'user_id',
        'club_id',
        'statut',
    ];

    /**
     * Relation avec le modèle User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec le modèle Club
     */
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

}
