<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $organizations = $user->organizations;
        $selectedOrgId = $request->query('organization_id', session('organization_id') ?? $organizations->first()?->id);
        
        $selectedOrg = $organizations->where('id', $selectedOrgId)->first();

        return Inertia::render('Chat/Index', [
            'organizations' => $organizations,
            'selectedOrg' => $selectedOrg,
            'initialMessages' => $selectedOrg 
                ? Message::with('sender')
                    ->where('organization_id', $selectedOrg->id)
                    ->orderBy('created_at', 'asc')
                    ->get()
                : []
        ]);
    }

    public function fetchMessages(Organization $organization)
    {
        // Authorization: User must belong to organization
        if (!auth()->user()->organizations()->where('organization_id', $organization->id)->exists()) {
            abort(403);
        }

        $messages = Message::with('sender')
            ->where('organization_id', $organization->id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request, Organization $organization)
    {
        if (!auth()->user()->organizations()->where('organization_id', $organization->id)->exists()) {
            abort(403);
        }

        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'organization_id' => $organization->id,
            'body' => $request->body,
        ]);

        return response()->json($message->load('sender'));
    }
}
