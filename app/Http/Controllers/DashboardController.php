<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTickets = Ticket::count();
        $openTickets = Ticket::where('status', 'open')->count();
        $resolvedTickets = Ticket::where('status', 'resolved')->count();
        $closedTickets = Ticket::where('status', 'closed')->count();

        $recentTickets = Ticket::with('user')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total' => $totalTickets,
                'open' => $openTickets,
                'resolved' => $resolvedTickets,
                'closed' => $closedTickets,
            ],
            'recentTickets' => $recentTickets,
        ]);
    }
}
