<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrateReserveSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reserve_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('contract_id');
            $table->integer('max_concurrent_reserve')->nullable();
            $table->string('reserve_slot_time');
            $table->string('default_stay_time');
            $table->integer('max_reserve_number')->nullable();
            $table->integer('reserve_months_limit')->nullable();
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
        Schema::dropIfExists('reserve_settings');
    }
}
