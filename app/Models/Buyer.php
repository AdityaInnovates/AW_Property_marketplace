<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'created_by_agent_id',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function propertiesLiked()
    {
        return $this->hasMany(BuyerLikedProperty::class);
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }
}