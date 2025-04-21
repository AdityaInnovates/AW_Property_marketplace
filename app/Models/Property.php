<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'property_type',
        'sale_or_rent',
        'address_id',
        'owner_id',
        'created_by_agent',
        'is_verified',
        'verification_docs',
        'status',
    ];
    // Relationship to Address
    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    // Relationship to Owner
    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    // Relationship to Agent
    public function agent()
    {
        return $this->belongsTo(Agent::class, 'created_by_agent');
    }

    public function media()
    {
        return $this->hasMany(PropertyMedia::class);
    }

    public function recommendations()
    {
        return $this->hasMany(PropertyRecommendation::class);
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }
}
