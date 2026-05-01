<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tickets = Ticket::with(['user', 'assignee'])->latest()->get();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $organizationId = session('organization_id');
        $organization = \App\Models\Organization::findOrFail($organizationId);
        $members = $organization->users;

        return Inertia::render('Tickets/Create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:open,pending,resolved,closed',
            'assignee_id' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
        ]);

        // Get the first organization if session is missing for now
        $organizationId = session('organization_id') ?? Auth::user()->organizations()->first()?->id;

        if (! $organizationId) {
            return back()->withErrors(['organization' => 'No active organization found.']);
        }

        Ticket::create([
            ...$validated,
            'user_id' => Auth::id(),
            'organization_id' => $organizationId,
            'source' => 'manual',
        ]);

        return redirect()->route('tickets.index')->with('success', 'Ticket created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket): Response
    {
        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket->load(['user', 'assignee', 'activities' => function ($query) {
                $query->latest();
            }, 'activities.user']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket): Response
    {
        $organizationId = session('organization_id');
        $organization = \App\Models\Organization::findOrFail($organizationId);
        $members = $organization->users;

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'members' => $members,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket): RedirectResponse
    {
        $validated = $request->validate([
            'subject' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,urgent',
            'status' => 'sometimes|required|in:open,pending,resolved,closed',
            'assignee_id' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'rating_score' => 'nullable|integer|min:1|max:5',
            'rating_comment' => 'nullable|string',
        ]);

        $ticket->update($validated);

        return back()->with('success', 'Ticket updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket): RedirectResponse
    {
        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully.');
    }
}
