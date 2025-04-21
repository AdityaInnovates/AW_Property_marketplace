<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserBuyerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a user
        $user = DB::table('users')->insert([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password'), // Use Hash::make to encrypt the password
            'phone' => '123-456-7890',
            'user_type' => 'buyer',
            'preferred_contact' => 'email',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user_id = DB::table('users')->where('email', 'john.doe@example.com')->first()->id;

        // Create a buyer associated with the user
        $buyer = DB::table('buyers')->insert([
            'user_id' => $user_id,
            'created_by_agent_id' => null, // Assuming no agent created this buyer
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
