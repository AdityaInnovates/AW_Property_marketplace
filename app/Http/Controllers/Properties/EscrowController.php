<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Escrow;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EscrowController extends Controller
{
    public function index()
    {
        return response()->json(Escrow::all());
    }

    public function show($id)
    {
        try {
            return response()->json(Escrow::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Escrow not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $escrow = Escrow::create($request->all());
        return response()->json($escrow, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $escrow = Escrow::findOrFail($id);
            $escrow->update($request->all());
            return response()->json($escrow, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Escrow not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Escrow::findOrFail($id);
            Escrow::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Escrow not found'], 404);
        }
    }
}