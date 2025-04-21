<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('evenements', function (Blueprint $table) {
        $table->id();
        $table->foreignId('club_id')->constrained('clubs');
        $table->string('titre');
        $table->text('description');
        $table->dateTime('date_debut');
        $table->dateTime('date_fin');
        $table->string('lieu');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
