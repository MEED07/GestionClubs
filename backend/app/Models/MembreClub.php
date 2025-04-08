<?php

namespace App\Models;

use Club;
use Illuminate\Database\Eloquent\Model;

class MembreClub extends Model
{


    protected $table = 'membre_club';

    protected $fillable = ['user_id', 'club_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
