<?php

namespace Database\Factories;

use App\Models\Owner;
use App\Models\User; // Import the User model
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = Owner::class;

    public function definition()
    {
        // Get the first user_id from the users table
        $user = User::first();

        // If no user exists, create one
        if (!$user) {
            $user = User::factory()->create();
        }

        return [
            'user_id' => $user->id, // Use the existing user's ID
            'developer_name' => $this->faker->company,
            'is_verified' => $this->faker->boolean,
            'verification_docs' => null,
            'invited_by_agent_id' => null,
        ];
    }
}