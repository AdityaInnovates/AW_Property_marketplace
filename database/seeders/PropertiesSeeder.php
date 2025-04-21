<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\Address; // Import the Address model
use App\Models\User;   // Import the Owner model
use App\Models\Agent;   // Import the Agent model
use Illuminate\Support\Facades\DB;

class PropertiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing Address, Owner, and Agent IDs (or create new ones if needed)
        $address = Address::factory()->create();
        $owner = Owner::factory()->create();
        $agent = User::factory()->create();

        // Example data for properties
        $properties = [
            [
                'title' => 'Luxury Villa',
                'property_type' => 'Villa',
                'sale_or_rent' => 'sale',
                'address_id' => $address->id,
                'owner_id' => $owner->id,
                'created_by_agent' => $agent->id,
                'is_verified' => true,
                'verification_docs' => 'path/to/docs',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Cozy Apartment',
                'property_type' => 'Apartment',
                'sale_or_rent' => 'rent',
                'address_id' => $address->id,
                'owner_id' => $owner->id,
                'created_by_agent' => $agent->id,
                'is_verified' => false,
                'verification_docs' => null,
                'status' => 'inactive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the properties table
        DB::table('properties')->insert($properties);
    }
}
