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
        Schema::rename('organizations', 'organizations');
        Schema::rename('organization_user', 'organization_user');

        Schema::table('organization_user', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('calls', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('sop_tasks', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('invitations', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('ticket_activities', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_activities', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('invitations', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('sop_tasks', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('calls', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::table('organization_user', function (Blueprint $table) {
            $table->renameColumn('organization_id', 'organization_id');
        });

        Schema::rename('organization_user', 'organization_user');
        Schema::rename('organizations', 'organizations');
    }
};
