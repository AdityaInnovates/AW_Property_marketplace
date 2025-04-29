<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AgentCreationController extends Controller
{
    public function store(Request $request)
    {
        Log::info('AgentCreationController@store called', ['request' => $request->except('password')]);

        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone' => 'nullable|string',
            'user_type' => 'required|string',
            'agent_type' => 'required|string',
            'license_number' => 'required|string',
            'license_expiry' => 'required|date',
            'is_verified' => 'nullable|boolean',
            'verification_docs' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'user_type' => $request->user_type,
            ]);
            Log::info('User created', ['user_id' => $user->id]);

            $agent = Agent::create([
                'user_id' => $user->id,
                'agent_type' => $request->agent_type,
                'license_number' => $request->license_number,
                'license_expiry' => $request->license_expiry,
                'is_verified' => $request->is_verified ?? false,
                'verification_docs' => $request->verification_docs,
            ]);
            Log::info('Agent created', ['agent_id' => $agent->id]);

            DB::commit();
            $agent = $agent->fresh();
            Log::info('Transaction committed, returning agent', ['agent' => $agent]);
            return response()->json($agent, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create agent and user', ['error' => $e->getMessage()]);
            throw ValidationException::withMessages(['error' => 'Failed to create agent and user: ' . $e->getMessage()]);
        }
    }
}
