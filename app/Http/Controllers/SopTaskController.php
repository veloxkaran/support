<?php

namespace App\Http\Controllers;

use App\Models\SopTask;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SopTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizationId = session('organization_id');
        $organization = Organization::findOrFail($organizationId);
        $user = auth()->user();
        
        // Get user role in this organization
        $role = $organization->users()->where('user_id', $user->id)->first()?->pivot->role;

        $query = SopTask::with('user');

        if ($role === 'Member') {
            $query->where('user_id', $user->id);
        }

        return Inertia::render('SopTasks/Index', [
            'tasks' => $query->latest()->get(),
            'organizationMembers' => $organization->users,
            'canManage' => in_array($role, ['Admin', 'Manager']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $organizationId = session('organization_id');
        $organization = Organization::findOrFail($organizationId);
        $role = $organization->users()->where('user_id', auth()->id())->first()?->pivot->role;

        if (!in_array($role, ['Admin', 'Manager'])) {
            abort(403, 'Only Admins and Managers can create SOPs.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'required|in:daily,weekly,monthly',
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*' => 'required|string|max:255',
        ]);

        $items = array_map(function($title) {
            return ['title' => $title, 'completed' => false];
        }, $request->items);

        SopTask::create([
            'organization_id' => $organizationId,
            'name' => $request->name,
            'description' => $request->description,
            'frequency' => $request->frequency,
            'user_id' => $request->user_id,
            'items' => $items,
            'is_active' => true,
        ]);

        return back()->with('success', 'SOP Checklist assigned successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SopTask $sopTask)
    {
        $organizationId = session('organization_id');
        $organization = Organization::findOrFail($organizationId);
        $role = $organization->users()->where('user_id', auth()->id())->first()?->pivot->role;

        // If toggling an item in the checklist
        if ($request->has('item_index')) {
            if ($sopTask->user_id !== auth()->id() && !in_array($role, ['Admin', 'Manager'])) {
                abort(403);
            }
            
            $items = $sopTask->items;
            $index = $request->item_index;
            if (isset($items[$index])) {
                $items[$index]['completed'] = $request->completed;
                $sopTask->update(['items' => $items]);
            }
            return back()->with('success', 'Checklist updated.');
        }

        // Full update or toggle status (Admin/Manager only)
        if (!in_array($role, ['Admin', 'Manager'])) {
            abort(403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'sometimes|required|in:daily,weekly,monthly',
            'user_id' => 'sometimes|required|exists:users,id',
            'is_active' => 'sometimes|boolean',
            'items' => 'sometimes|array',
        ]);

        if ($request->has('items')) {
            $items = array_map(function($item) {
                return is_string($item) ? ['title' => $item, 'completed' => false] : $item;
            }, $request->items);
            $request->merge(['items' => $items]);
        }

        $sopTask->update($request->all());

        return back()->with('success', 'SOP updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SopTask $sopTask)
    {
        $organizationId = session('organization_id');
        $organization = Organization::findOrFail($organizationId);
        $role = $organization->users()->where('user_id', auth()->id())->first()?->pivot->role;

        if (!in_array($role, ['Admin', 'Manager'])) {
            abort(403);
        }

        $sopTask->delete();
        return back()->with('success', 'SOP deleted successfully.');
    }
}
