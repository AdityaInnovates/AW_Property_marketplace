<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\BuyerRecommendedProperty;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BuyerRecommendedPropertyController extends Controller
{
    public function index()
    {
        return response()->json(BuyerRecommendedProperty::all(), 200);
    }

    public function show($id)
    {
        try {
            return response()->json(BuyerRecommendedProperty::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer Recommended Property not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $recommendedProperty = BuyerRecommendedProperty::create($request->all());
        return response()->json($recommendedProperty, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $recommendedProperty = BuyerRecommendedProperty::findOrFail($id);
            $recommendedProperty->update($request->all());
            return response()->json($recommendedProperty, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer Recommended Property not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            BuyerRecommendedProperty::findOrFail($id);
            BuyerRecommendedProperty::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer Recommended Property not found'], 404);
        }
    }
}