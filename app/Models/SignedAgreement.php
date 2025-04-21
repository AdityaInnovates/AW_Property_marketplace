<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignedAgreement extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'agent_id',
        'property_id',
        'verification_docs',
        'status',
        'signed_at',
    ];

    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}