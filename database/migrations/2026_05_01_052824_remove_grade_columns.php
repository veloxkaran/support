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
        Schema::table('organization_user', function (Blueprint $table) {
            $table->dropColumn('grade');
        });

        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn('grade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organization_user', function (Blueprint $table) {
            $table->integer('grade')->default(1);
        });

        Schema::table('invitations', function (Blueprint $table) {
            $table->integer('grade')->default(1);
        });
    }
};
