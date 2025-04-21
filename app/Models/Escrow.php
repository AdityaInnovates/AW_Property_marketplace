<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Escrow extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'amount',
        'status',
        'escrow_date',
        'transaction_date',
        'agent_id',
        'buyer_id',
        'payment_account',
        'released_by',
        'release_date',
        'release_notes',
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