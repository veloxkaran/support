<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    public function config(Request $request)
    {
        $token = $request->query('token');

        if (! $token) {
            return response()->json(['error' => 'Token missing'], 400);
        }

        // Find organization by token/slug or ID in real scenario. Using slug as token here
        $organization = Organization::where('slug', $token)->first();

        if (! $organization) {
            return response()->json(['error' => 'Invalid token'], 404);
        }

        return response()->json([
            'widget_settings' => $organization->settings['widget'] ?? [
                'color' => '#3b82f6',
                'title' => 'Chat with us!',
            ],
        ]);
    }
}
