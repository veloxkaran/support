<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketActivityController extends Controller
{
    /**
     * Store a newly created ticket activity (comment).
     */
    public function store(Request $request, Ticket $ticket)
    {
        $request->validate([
            'activity' => 'required|string|max:1000',
        ]);

        TicketActivity::create([
            'organization_id' => session('organization_id'),
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
            'activity' => $request->activity,
        ]);

        return redirect()->back()->with('success', 'Comment added successfully.');
    }
}
