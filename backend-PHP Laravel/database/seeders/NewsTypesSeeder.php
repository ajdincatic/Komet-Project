<?php

namespace Database\Seeders;

use App\Models\NewsTypes;
use App\Models\UserTypes;
use Illuminate\Database\Seeder;

class NewsTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        NewsTypes::insert([
            'type_name'=>'Team News'
        ]);
        NewsTypes::insert([
            'type_name'=>'Client News'
        ]);
    }
}
