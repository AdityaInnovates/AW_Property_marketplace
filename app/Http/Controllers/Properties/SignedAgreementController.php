<?php

namespace App\Http\Controllers\Properties;

use App\Http\Controllers\Controller;
use App\Models\SignedAgreement;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SignedAgreementController extends Controller
{
    public function index()
    {
        return response()->json(SignedAgreement::all(), 200);
    }

    public function show($id)
    {
        try {
            return response()->json(SignedAgreement::findOrFail($id), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Signed Agreement not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $agreement = SignedAgreement::create($request->all());
        return response()->json($agreement, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $agreement = SignedAgreement::findOrFail($id);
            $agreement->update($request->all());
            return response()->json($agreement, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Signed Agreement not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            SignedAgreement::findOrFail($id);
            SignedAgreement::destroy($id);
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Signed Agreement not found'], 404);
        }
    }
}