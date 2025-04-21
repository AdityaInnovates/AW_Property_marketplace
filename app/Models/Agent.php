<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'agent_type',
        'license_number',
        'license_expiry',
        'is_verified',
        'verification_docs',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class, 'created_by_agent');
    }

    public function buyers()
    {
        return $this->hasMany(Buyer::class, 'created_by_agent_id');
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }
}
