<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'description', 'date_debut', 'date_fin', 'lieu',
        'club_id', 'admin_club_id',
      ];
      
    

    // Définir la relation avec le club
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_club_id');
    }
}
