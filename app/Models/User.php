<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableBase;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;

class User extends AuthenticatableBase implements Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'phone',
        'user_type',
        'preferred_contact',
        'profile_picture',
        'address',
        'description',
        'social_provider',
        'social_id',
    ];

    public function buyers()
    {
        return $this->hasMany(Buyer::class);
    }

    public function agents()
    {
        return $this->hasMany(Agent::class);
    }

    public function owners()
    {
        return $this->hasMany(Owner::class);
    }
}