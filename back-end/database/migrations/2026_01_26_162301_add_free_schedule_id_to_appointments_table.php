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
        Schema::table('appointments', function (Blueprint $table) {
            $table->unsignedInteger('free_schedule_id')->after('service_id');
            $table->foreign('free_schedule_id', 'idx_free_schedule_id_appointments')->references('id')->on('free_schedules');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign('idx_free_schedule_id_appointments');
            $table->dropColumn('free_schedule_id');
        });
    }
};
