<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableReportedBugs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reported_bugs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('message');
            $table->integer('user_creator_id')->unsigned();
            $table->foreign('user_creator_id')->references('id')->on('users');
            $table->string('attachment_path')->nullable();
            $table->dateTime('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reported_bugs');
    }
}
