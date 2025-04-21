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
        Schema::create('escrow', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('property_id')->constrained()->onDelete('cascade'); 
            $table->decimal('amount', 10, 2); 
            $table->string('status'); 
            $table->timestamp('escrow_date'); 
            $table->timestamp('transaction_date');
            $table->foreignId('agent_id')->constrained("agents","user_id")->onDelete('cascade'); 
            $table->foreignId('buyer_id')->constrained("buyers","user_id")->onDelete('cascade');
            $table->string('payment_account');
            $table->foreignId('released_by')->constrained('agents',"user_id")->onDelete('cascade');
            $table->timestamp('release_date')->nullable();
            $table->text('release_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escrow');
    }
};
