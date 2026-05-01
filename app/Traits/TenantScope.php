<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait TenantScope
{
    protected static function bootTenantScope()
    {
        if (auth()->check() && session()->has('organization_id')) {
            static::addGlobalScope('organization', function (Builder $builder) {
                $builder->where('organization_id', session('organization_id'));
            });
        }
    }
}
