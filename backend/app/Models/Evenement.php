<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = ['club_id', 'titre', 'description', 'date_debut', 'date_fin', 'lieu'];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'participations')
                    ->withPivot('statut');
    }
}
