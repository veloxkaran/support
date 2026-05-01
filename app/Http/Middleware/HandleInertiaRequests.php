<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->user() && ! session()->has('organization_id')) {
            $firstOrg = $request->user()->organizations()->first();
            if ($firstOrg) {
                session(['organization_id' => $firstOrg->id]);
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'organization' => $request->user() ?
                    ($org = $request->user()->organizations->where('id', session('organization_id'))->first() ?? $request->user()->organizations->first())
                    : null,
                'userRole' => (isset($org) && $org) ? $org->pivot->role : null,
            ],
        ];
    }
}
