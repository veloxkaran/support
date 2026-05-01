<?php

namespace App\Models;

use App\Traits\TenantScope;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected $fillable = ['organization_id', 'ticket_id', 'recording_path', 'duration', 'sid'];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
