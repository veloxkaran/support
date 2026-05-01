<?php

namespace App\Models;

use App\Traits\TenantScope;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory, HasUuids, TenantScope;

    protected $fillable = [
        'organization_id',
        'user_id',
        'subject',
        'description',
        'status',
        'priority',
        'source',
        'voice_recording_url',
        'rating_score',
        'rating_comment',
        'due_date',
        'attachment_url',
        'assignee_id',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function calls()
    {
        return $this->hasMany(Call::class);
    }

    public function activities()
    {
        return $this->hasMany(TicketActivity::class);
    }
}
