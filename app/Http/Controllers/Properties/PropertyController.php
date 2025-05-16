<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;
use App\Models\Address;

class PropertyController extends Controller
{
    public function index()
    {
        return response()->json(Property::with(['owner', 'address'])->get());
    }

    public function show($id)
    {
        try {
            return response()->json(Property::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property not found'], 404);
        }
    }

    // public function store(Request $request)
    // {
    //     // error_log(json_encode($request->all()));
    //     // $property = Property::create($request->all());
    //     // return response()->json($property, 201);

    //     $validated = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'property_type' => 'required|string|max:100',
    //         'sale_or_rent' => ['required', Rule::in(['sale', 'rent'])],
    //         'address_id' => 'required|exists:addresses,id',
    //         'owner_id' => 'required|exists:owners,id',
    //         'created_by_agent' => 'nullable|exists:agents,id',
    //         'status' => 'required|string|max:100',
    //         'verification_docs' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    //     ]);

    //     if ($request->hasFile('verification_docs')) {
    //         $path = $request->file('verification_docs')->store('verification_docs', 'public');
    //         $validated['verification_docs'] = $path;
    //     }

    //     $property = Property::create($validated);

    //     return redirect()->route('properties.create')->with('success', 'Property created successfully.');
    // }

public function store(Request $request)
{
    // 1. Check for nested address object and validate it
    if ($request->has('address') && is_array($request->address)) {
        $addressData = $request->validate([
            'address.street_line1' => 'required|string|max:255',
            'address.street_line2' => 'nullable|string|max:255',
            'address.city' => 'required|string|max:100',
            'address.state' => 'required|string|max:100',
            'address.postal_code' => 'required|string|max:20',
            'address.country' => 'required|string|max:100',
            'address.latitude' => 'nullable|numeric',
            'address.longitude' => 'nullable|numeric',
            'address.visibility_mark' => 'nullable|boolean',
        ]);

        $newAddress = Address::create($addressData['address']);

        // Attach address_id to main request
        $request->merge(['address_id' => $newAddress->id]);
    }

    // 2. Validate property fields
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'property_type' => 'required|string|max:100',
        'sale_or_rent' => ['required', Rule::in(['sale', 'rent'])],
        'address_id' => 'required|exists:addresses,id',
        'owner_id' => 'required|exists:owners,id',
        'created_by_agent' => 'nullable|exists:agents,id',
        'status' => 'required|string|max:100',
        'verification_docs' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);

    // 3. Handle file upload
    if ($request->hasFile('verification_docs')) {
        $path = $request->file('verification_docs')->store('verification_docs', 'public');
        $validated['verification_docs'] = $path;
    }

    // 4. Create the property
    $property = Property::create($validated);

    return response()->json(['success'=>'Property and address created successfully.'],200);
}


    public function update(Request $request, $id)
    {
        try {
            $property = Property::findOrFail($id);
            $property->update($request->all());
            return response()->json($property, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Property::findOrFail($id);
            Property::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property not found'], 404);
        }
    }
}