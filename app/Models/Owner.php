<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'developer_name',
        'is_verified',
        'verification_docs',
        'invited_by_agent_id',
    ];

    // Relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Agent (if needed)
    public function agent()
    {
        return $this->belongsTo(Agent::class, 'invited_by_agent_id');
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}