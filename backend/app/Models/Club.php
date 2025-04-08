<?php

use App\Models\Evenement;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Club extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description', 'logo', 'admin_club_id'];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_club_id');
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }

    public function membres()
    {
        return $this->belongsToMany(User::class, 'membre_club');
    }
}
