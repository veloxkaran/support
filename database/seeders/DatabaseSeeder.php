<?php

namespace Database\Seeders;

use App\Models\Ticket;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp-'.Str::random(4),
        ]);

        $user->organizations()->attach($organization->id, ['role' => 'Owner']);

        Ticket::create([
            'organization_id' => $organization->id,
            'user_id' => $user->id,
            'subject' => 'System performance issues',
            'description' => 'The dashboard is loading slowly in the afternoon.',
            'status' => 'open',
            'priority' => 'high',
            'source' => 'manual',
        ]);

        Ticket::create([
            'organization_id' => $organization->id,
            'user_id' => $user->id,
            'subject' => 'Billing inquiry',
            'description' => 'I was charged twice for the last month.',
            'status' => 'pending',
            'priority' => 'medium',
            'source' => 'widget',
        ]);

        Ticket::create([
            'organization_id' => $organization->id,
            'user_id' => $user->id,
            'subject' => 'Feature Request: Dark Mode',
            'description' => 'We would love to have a dark mode option.',
            'status' => 'resolved',
            'priority' => 'low',
            'source' => 'chat',
        ]);
    }
}
