<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyerRecommendedProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'property_id',
        'score',
        'recommended_at',
    ];

    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}