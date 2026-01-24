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
            $table->unsignedInteger('service_id')->nullable(false);
            $table->decimal('price', 6, 2)->nullable(false);
            $table->text('observations')->nullable(true);

            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['service_id']); // drop constraint e índice before delete fields!
            $table->dropColumn([
                'service_id', 'price', 'observations' 
            ]);
        });
    }
};
