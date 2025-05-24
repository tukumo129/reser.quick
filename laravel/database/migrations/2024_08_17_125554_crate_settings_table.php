<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->integer('contract_id');
            $table->string('store_name')->default('テスト店舗');
            $table->string('reserve_slot_time')->default('30');
            $table->integer('max_reserve_number')->default(10);
            $table->integer('reserve_months_limit')->default(3);
            $table->integer('reserve_block_minutes')->default(30);
            $table->integer('max_available_reserve')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
