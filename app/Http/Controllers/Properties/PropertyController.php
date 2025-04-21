<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    public function store(Request $request)
    {
        $property = Property::create($request->all());
        return response()->json($property, 201);
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