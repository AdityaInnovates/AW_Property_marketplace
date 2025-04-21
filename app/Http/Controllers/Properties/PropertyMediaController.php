<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\PropertyMedia;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PropertyMediaController extends Controller
{
    public function index()
    {
        return response()->json(PropertyMedia::all());
    }

    public function show($id)
    {
        try {
            return response()->json(PropertyMedia::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property Media not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $media = PropertyMedia::create($request->all());
        return response()->json($media, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $media = PropertyMedia::findOrFail($id);
            $media->update($request->all());
            return response()->json($media, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property Media not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            PropertyMedia::findOrFail($id);
            PropertyMedia::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Property Media not found'], 404);
        }
    }
}