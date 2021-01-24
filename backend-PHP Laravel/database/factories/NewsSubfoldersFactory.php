<?php

namespace Database\Factories;

use App\Models\Countries;
use App\Models\NewsSubfolders;
use App\Models\NewsTypes;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsSubfoldersFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = NewsSubfolders::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = NewsTypes::get()->toArray();
        $typeIndex = array_rand(NewsTypes::get()->toArray());

        $users = Users::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'title'=>substr($this->faker->text,0,8),
            'news_type_id'=>$types[$typeIndex]['id'],
            'creator_id'=>$users[$userIndex]['id']
        ];
    }
}
