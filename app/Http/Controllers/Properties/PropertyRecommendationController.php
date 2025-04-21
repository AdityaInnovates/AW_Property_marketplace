<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\PropertyRecommendation;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PropertyRecommendationController extends Controller
{
    public function index()
    {
        return response()->json(PropertyRecommendation::all());
    }

    public function show($id)
    {
        try {
            $recommendation = PropertyRecommendation::findOrFail($id);
            return response()->json($recommendation, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Recommendation not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $recommendation = PropertyRecommendation::create($request->all());
        return response()->json($recommendation, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $recommendation = PropertyRecommendation::findOrFail($id);
            $request->validate([
                'property_id' => 'sometimes|required|exists:properties,id',
                'recommended_ids' => 'sometimes|required|json',
            ]);
            $recommendation->update($request->all());
            return response()->json($recommendation, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Recommendation not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            PropertyRecommendation::findOrFail($id);
            PropertyRecommendation::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Recommendation not found'], 404);
        }
    }
}