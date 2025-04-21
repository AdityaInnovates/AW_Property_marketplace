<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DealController extends Controller
{
    public function index()
    {
        return response()->json(Deal::with(['agent.user', 'buyer.user','property'])->get());
    }

    public function show($id)
    {
        try {
            return response()->json(Deal::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Deal not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $deal = Deal::create($request->all());
        return response()->json($deal, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $deal = Deal::findOrFail($id);
            $deal->update($request->all());
            return response()->json($deal, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Deal not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Deal::findOrFail($id);
            Deal::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Deal not found'], 404);
        }
    }
}