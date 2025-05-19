<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;
use App\Models\Address;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    // public function index()
    // {
    //     return response()->json(Property::with(['owner', 'address'])->get());
    // }

    public function index()
{
    $properties = Property::with(['owner.user', 'address', 'createdBy','agent.user'])->get();

    $formatted = $properties->map(function ($p) {
        return [
            'id' => $p->id,
            'title' => $p->title,
            'property_type' => $p->property_type,
            'sale_or_rent' => $p->sale_or_rent,
            'status' => $p->status,
            'is_verified' => $p->is_verified,
            'address' => [
                'street_line1' => $p->address->street_line1 ?? null,
                'city' => $p->address->city ?? null,
                'state' => $p->address->state ?? null,
                'country' => $p->address->country ?? null,
            ],
            'owner' => $p->owner, // includes user if 'user' relation is defined on owner
            'agent' => $p->agent,
            'created_by' => $p->createdBy?->name,
            'verification_docs' => $p->verification_docs 
                ? asset('storage/' . $p->verification_docs)
                : null,
        ];
    });

    return response()->json($formatted);
}


    // public function show($id)
    // {
    //     try {
    //         return response()->json(Property::findOrFail($id), 200);
    //     } catch (ModelNotFoundException $e) {
    //         return response()->json(['error' => 'Property not found'], 404);
    //     }
    // }

    public function show($id)
{
    try {
        $p = Property::with(['owner.user', 'address', 'createdBy','agent.user'])->findOrFail($id);

        return response()->json([
            'id' => $p->id,
            'title' => $p->title,
            'property_type' => $p->property_type,
            'sale_or_rent' => $p->sale_or_rent,
            'status' => $p->status,
            'is_verified' => $p->is_verified,
            'address' => [
                'street_line1' => $p->address->street_line1 ?? null,
                'city' => $p->address->city ?? null,
                'state' => $p->address->state ?? null,
                'country' => $p->address->country ?? null,
            ],
            'owner' => $p->owner,
            'agent' => $p->agent,
            'created_by' => $p->createdBy?->name,
            'verification_docs' => $p->verification_docs 
                ? asset('storage/' . $p->verification_docs)
                : null,
        ], 200);

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


        $request->merge(['address_id' => $newAddress->id]);
    }

     $validated = $request->validate([
        'title' => 'required|string|max:255',
        'property_type' => 'required|string|max:100',
        'sale_or_rent' => ['required', Rule::in(['sale', 'rent'])],
        'address_id' => 'required|exists:addresses,id',
        'owner_id' => 'required|exists:owners,id',
        'agent_id' => 'nullable|exists:agents,id',
        'status' => 'required|string|max:100',
        'verification_docs' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);


    if ($request->hasFile('verification_docs')) {
        $path = $request->file('verification_docs')->store('verification_docs', 'public');
        $validated['verification_docs'] = $path;
    }


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

 public function verify(Request $request, $id)
{
    try {
        $validator = Validator::make($request->all(), [
            'is_verified' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid input for is_verified'], 422);
        }

        $property = Property::findOrFail($id);
        $property->is_verified = $request->input('is_verified');
        $property->save();

        return response()->json($property, 200);
    } catch (ModelNotFoundException $e) {
        return response()->json(['error' => 'Property not found'], 404);
    }
}

}