<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\BuyerLikedProperty;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BuyerLikedPropertyController extends Controller
{
    public function index()
    {
        return response()->json(BuyerLikedProperty::all());
    }

    public function show($id)
    {
        try {
            return response()->json(BuyerLikedProperty::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Liked Property not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $likedProperty = BuyerLikedProperty::create($request->all());
        return response()->json($likedProperty, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $likedProperty = BuyerLikedProperty::findOrFail($id);
            $likedProperty->update($request->all());
            return response()->json($likedProperty, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Liked Property not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            BuyerLikedProperty::findOrFail($id);
            BuyerLikedProperty::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Liked Property not found'], 404);
        }
    }
}