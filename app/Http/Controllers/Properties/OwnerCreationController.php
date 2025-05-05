<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OwnerCreationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone' => 'nullable|string',
            'user_type' => 'required|string',
            'is_verified' => 'nullable|boolean',
            'verification_docs' => 'nullable|string',
            'preferred_contact'=>'nullable|string',
            'developer_name'=>'required|string'
            // Add owner-specific validation rules here if any
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
                'preferred_contact'=>$request->preferred_contact,
            ]);

            $owner = Owner::create([
                'user_id' => $user->id,
                'is_verified' => $request->is_verified ?? false,
                'verification_docs' => $request->verification_docs,
                'developer_name' => $request->developer_name,
            ]);

            DB::commit();
            $owner = $owner->fresh();
            return response()->json($owner, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages(['error' => 'Failed to create owner and user: ' . $e->getMessage()]);
        }
    }
}
