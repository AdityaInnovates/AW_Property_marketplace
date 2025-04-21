<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AddressController extends Controller
{
    public function index()
    {
        return response()->json(Address::all(), 200);
    }

    public function show($id)
    {
        try {
            $address = Address::findOrFail($id);
            return response()->json($address, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Address not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'street_line1' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
        ]);

        $address = Address::create($request->all());
        return response()->json($address, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $address = Address::findOrFail($id);
            $request->validate([
                'street_line1' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'postal_code' => 'required|string|max:20',
                'country' => 'required|string|max:255',
            ]);

            $address->update($request->all());
            return response()->json($address, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Address not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Address::findOrFail($id);
            Address::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Address not found'], 404);
        }
    }
}