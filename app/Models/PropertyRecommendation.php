<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyRecommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'recommended_ids',
    ];

    // Relationship to Property
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}