<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use App\Models\Organization;
use App\Models\User;

class OrganizationInvitationController extends Controller
{
    public function store(Request $request)
    {
        $organizationId = session('organization_id');
        $organization = Organization::findOrFail($organizationId);

        $request->validate([
            'email' => 'required|email',
            'role' => 'required|in:Admin,Manager,Member,Customer',
        ]);

        // Check if user is already a member
        $user = User::where('email', $request->email)->first();
        if ($user && $organization->users()->where('user_id', $user->id)->exists()) {
            return back()->withErrors(['email' => 'User is already in this organization.']);
        }

        // Check if there is already a pending invitation
        if (Invitation::where('email', $request->email)->where('organization_id', $organization->id)->where('status', 'pending')->exists()) {
            return back()->withErrors(['email' => 'An invitation is already pending for this email.']);
        }

        Invitation::create([
            'email' => $request->email,
            'organization_id' => $organization->id,
            'role' => $request->role,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Invitation sent successfully.');
    }

    public function accept(Invitation $invitation)
    {
        if ($invitation->email !== auth()->user()->email) {
            abort(403);
        }

        $invitation->update(['status' => 'accepted']);

        auth()->user()->organizations()->attach($invitation->organization_id, [
            'role' => $invitation->role,
        ]);

        session(['organization_id' => $invitation->organization_id]);

        return redirect()->route('dashboard')->with('success', "Joined organization: {$invitation->organization->name}");
    }

    public function decline(Invitation $invitation)
    {
        if ($invitation->email !== auth()->user()->email) {
            abort(403);
        }

        $invitation->update(['status' => 'declined']);

        return back()->with('success', 'Invitation declined.');
    }
}
