<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AgentController extends Controller
{
    public function index()
    {
        return response()->json(Agent::all());
    }

    public function show($id)
    {
        try {
            return response()->json(Agent::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Agent not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $agent = Agent::create($request->all());
        return response()->json($agent, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $agent = Agent::findOrFail($id);
            $agent->update($request->all());
            return response()->json($agent, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Agent not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            Agent::findOrFail($id);
            Agent::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Agent not found'], 404);
        }
    }
}