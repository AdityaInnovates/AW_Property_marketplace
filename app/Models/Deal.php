<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'buyer_id',
        'agent_id',
        'deal_status',
        'commission',
        'commission_status',
        'deal_date',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }
}