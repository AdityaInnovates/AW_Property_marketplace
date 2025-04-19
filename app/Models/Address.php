<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street_line1',
        'street_line2',
        'city',
        'state',
        'postal_code',
        'country',
        'latitude',
        'longitude',
        'visibility_mark',
    ];

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}