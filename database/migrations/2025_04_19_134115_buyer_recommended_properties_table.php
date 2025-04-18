<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buyer_recommended_properties', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('buyer_id')->constrained("buyers","user_id")->onDelete('cascade'); 
            $table->foreignId('property_id')->constrained()->onDelete('cascade'); 
            $table->integer('score');
            $table->timestamp('recommended_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyer_recommended_properties');
    }
};
