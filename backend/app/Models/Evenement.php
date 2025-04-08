<?php

namespace App\Models;

use Club;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    

    protected $fillable = ['titre', 'description', 'date', 'lieu', 'club_id'];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function participations()
    {
        return $this->hasMany(Participation::class);
    }
}
