<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Support\Facades\Validator;

class AgentController extends Controller
{
    public function index()
    {
        return response()->json(Agent::with(['user'])->get());
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

    public function updateVerificationStatus(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'is_verified' => 'required|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'Invalid input for is_verified'], 422);
            }

            $agent = Agent::findOrFail($id);
            $agent->is_verified = $request->input('is_verified');
            $agent->save();

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
