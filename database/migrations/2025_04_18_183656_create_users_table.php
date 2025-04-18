<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); 
            $table->string('email')->unique();
            $table->string('password');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('user_type');
            $table->string('preferred_contact');
            $table->string('profile_picture')->nullable();
            $table->text('address')->nullable();
            $table->text('description')->nullable();
            $table->string('social_provider')->nullable();
            $table->string('social_id')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};