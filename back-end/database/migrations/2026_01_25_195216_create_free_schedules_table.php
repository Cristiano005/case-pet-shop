<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('free_schedules', function (Blueprint $table) {
            $table->id();
            $table->date('day');
            $table->time('hour');
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->unique(['day', 'hour'], 'idx_day_hour_free_schedules');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('free_schedules');
    }
};
