<?php

namespace App\Models;

use Club;
use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
  

    protected $fillable = ['user_id', 'evenement_id', 'statut'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}
