<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    /**
     * Display the members of the active organization.
     */
    public function members()
    {
        $organizationId = session('organization_id');
        
        if (! $organizationId) {
            // Fallback to user's first organization if session is lost
            $org = auth()->user()->organizations()->first();
            if ($org) {
                session(['organization_id' => $org->id]);
                $organizationId = $org->id;
            } else {
                return redirect()->route('login')->with('error', 'Please log in again.');
            }
        }

        $organization = Organization::with('users')->findOrFail($organizationId);
        $pendingInvitations = \App\Models\Invitation::where('organization_id', $organizationId)
            ->where('status', 'pending')
            ->get();

        return Inertia::render('Organizations/Members', [
            'organization' => $organization,
            'members' => $organization->users,
            'pendingInvitations' => $pendingInvitations,
        ]);
    }
}
