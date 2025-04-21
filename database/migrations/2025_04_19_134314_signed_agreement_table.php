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
        Schema::create('signed_agreements', function (Blueprint $table) {
            $table->id('agreement_id'); 
            $table->foreignId('buyer_id')->constrained("buyers","user_id")->onDelete('cascade'); 
            $table->foreignId('agent_id')->constrained('agents', 'user_id')->onDelete('cascade'); 
            $table->foreignId('property_id')->constrained()->onDelete('cascade'); 
            $table->text('verification_docs')->nullable();
            $table->string('status');
            $table->timestamp('signed_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signed_agreements');
    }
};
