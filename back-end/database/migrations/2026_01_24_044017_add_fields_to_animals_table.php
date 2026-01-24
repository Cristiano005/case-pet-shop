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
        Schema::table('animals', function (Blueprint $table) {
            $table->enum('sex', ['male', 'female'])->nullable(false)->after('breed');
            $table->decimal('age', 3, 1)->nullable(false)->after('sex');
            $table->decimal('weight', 4, 2)->nullable(false)->after('age');
            $table->text('observations')->nullable(true)->after('weight');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('animals', function (Blueprint $table) {
            $table->dropColumn([
                'sex', 'age', 'weight', 'observations'
            ]);
        });
    }
};
