<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Buyer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BuyerCreationController extends Controller
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
            'preferred_contact'=>'nullable|string',
            // Add buyer-specific validation rules here if any
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

            $buyer = Buyer::create([
                'user_id' => $user->id,
                // Add buyer-specific fields here if any
            ]);

            DB::commit();
            $buyer = $buyer->fresh();
            return response()->json($buyer, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages(['error' => 'Failed to create buyer and user: ' . $e->getMessage()]);
        }
    }
}
