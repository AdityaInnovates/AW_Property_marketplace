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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('property_type');
            $table->enum('sale_or_rent', ['sale', 'rent']);
            $table->foreignId('address_id')->constrained("addresses")->onDelete('cascade');
            $table->foreignId('owner_id')->constrained('owners')->onDelete('cascade');
            $table->foreignId('created_by_agent')->constrained('agents')->onDelete('set null');
            $table->boolean('is_verified')->default(false);
            $table->text('verification_docs')->nullable();
            $table->timestamps();
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
