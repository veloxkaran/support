<?php

$migrationsDir = __DIR__.'/database/migrations/';
$files = scandir($migrationsDir);

foreach ($files as $file) {
    if (str_ends_with($file, '.php')) {
        $content = file_get_contents($migrationsDir.$file);

        // General replacements
        if ($file === '0001_01_01_000000_create_users_table.php') {
            $content = str_replace('$table->id();', '$table->uuid(\'id\')->primary();', $content);
            $content = str_replace('$table->foreignId(\'user_id\')', '$table->foreignUuid(\'user_id\')', $content);
        } else {
            $content = str_replace('$table->id();', '$table->uuid(\'id\')->primary();'."\n".'            $table->foreignUuid(\'organization_id\')->constrained(\'organizations\')->cascadeOnDelete();', $content);

            // Except for organization, where it shouldn't have organization_id
            if (str_contains($file, 'create_organizations_table')) {
                $content = str_replace('            $table->foreignUuid(\'organization_id\')->constrained(\'organizations\')->cascadeOnDelete();', '', $content);
                // Add organization columns
                $content = str_replace('$table->timestamps();', '$table->string(\'name\');
            $table->string(\'slug\')->unique();
            $table->string(\'subscription_status\')->default(\'active\');
            $table->jsonb(\'settings\')->nullable();
            $table->timestamps();', $content);
            }

            if (str_contains($file, 'create_tickets_table')) {
                $content = str_replace('$table->timestamps();', '$table->enum(\'source\', [\'manual\', \'widget\', \'chat\', \'call\']);
            $table->string(\'voice_recording_url\')->nullable();
            $table->timestamps();', $content);
            }

            if (str_contains($file, 'create_calls_table')) {
                $content = str_replace('$table->timestamps();', '$table->foreignUuid(\'ticket_id\')->constrained(\'tickets\')->cascadeOnDelete();
            $table->string(\'recording_path\')->nullable();
            $table->integer(\'duration\')->nullable();
            $table->string(\'sid\')->nullable();
            $table->timestamps();', $content);
            }

            if (str_contains($file, 'create_sop_tasks_table')) {
                $content = str_replace('$table->timestamps();', '$table->string(\'title\');
            $table->boolean(\'is_completed\')->default(false);
            $table->timestamps();', $content);
            }

            if (str_contains($file, 'create_ticket_activities_table')) {
                $content = str_replace('$table->timestamps();', '$table->foreignUuid(\'ticket_id\')->constrained(\'tickets\')->cascadeOnDelete();
            $table->string(\'activity\');
            $table->timestamps();', $content);
            }
        }

        file_put_contents($migrationsDir.$file, $content);
    }
}

echo "Migrations updated to UUID and custom columns added.\n";
