<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BuyerController extends Controller
{
    public function index()
    {
        return response()->json(Buyer::all());
    }

    public function show($id)
    {
        try {
            return response()->json(Buyer::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $buyer = Buyer::create($request->all());
        return response()->json($buyer, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $buyer = Buyer::findOrFail($id);
            $buyer->update($request->all());
            return response()->json($buyer, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Buyer::findOrFail($id);
            Buyer::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Buyer not found'], 404);
        }
    }
}