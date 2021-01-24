<?php

namespace Database\Seeders;

use App\Models\UserTypes;
use Illuminate\Database\Seeder;

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserTypes::insert([
            'type_name'=>'Administrator'
        ]);
        UserTypes::insert([
            'type_name'=>'Employee'
        ]);
        UserTypes::insert([
            'type_name'=>'User'
        ]);
        UserTypes::insert([
            'type_name'=>'Representative'
        ]);
    }
}
