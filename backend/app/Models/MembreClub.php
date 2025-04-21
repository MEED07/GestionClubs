<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MembreClub extends Pivot
{
    protected $table = 'membre_club';

    protected $fillable = [
        'user_id',
        'club_id',
    ];
}
