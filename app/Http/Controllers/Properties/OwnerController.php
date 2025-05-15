<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OwnerController extends Controller
{
    public function index()
    {
        return response()->json(Owner::with(['user'])->get());
    }

    public function show($id)
    {
        try {
            return response()->json(Owner::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Owner not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $owner = Owner::create($request->all());
        return response()->json($owner, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $owner = Owner::findOrFail($id);
            $owner->update($request->all());
            return response()->json($owner, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Owner not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Owner::findOrFail($id);
            Owner::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Owner not found'], 404);
        }
    }
}
