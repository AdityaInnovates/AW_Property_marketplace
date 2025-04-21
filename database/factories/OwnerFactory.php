<?php

namespace Database\Factories;

use App\Models\Owner;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OwnerFactory extends Factory
{
    protected $model = Owner::class;

    public function definition()
    {
        // Create a new user for each owner
        $user = User::factory()->create(['user_type' => 'owner']);

        return [
            'user_id' => $user->id,
            'developer_name' => $this->faker->company,
            'is_verified' => $this->faker->boolean,
            'verification_docs' => null,
            'invited_by_agent_id' => null,
        ];
    }
}