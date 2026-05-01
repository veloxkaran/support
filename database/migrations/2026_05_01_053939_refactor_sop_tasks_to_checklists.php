<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sop_tasks', function (Blueprint $table) {
            $table->renameColumn('title', 'name');
            $table->json('items')->nullable();
            $table->boolean('is_active')->default(true);
            $table->dropColumn('is_completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sop_tasks', function (Blueprint $table) {
            $table->renameColumn('name', 'title');
            $table->dropColumn(['items', 'is_active']);
            $table->boolean('is_completed')->default(false);
        });
    }
};
