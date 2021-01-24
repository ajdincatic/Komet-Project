<?php

namespace Database\Seeders;

use App\Models\MediaTypes;
use App\Models\UserTypes;
use Illuminate\Database\Seeder;

class MediaTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MediaTypes::insert([
            'type_name'=>'PHOTO'
        ]);
        MediaTypes::insert([
            'type_name'=>'VIDEO'
        ]);
        MediaTypes::insert([
            'type_name'=>'TEAM VIDEO'
        ]);
    }
}
