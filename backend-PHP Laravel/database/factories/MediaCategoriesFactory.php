<?php

namespace Database\Factories;

use App\Models\MediaCategories;
use App\Models\MediaTypes;
use App\Models\NewsTypes;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaCategoriesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MediaCategories::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = MediaTypes::get()->toArray();
        $typeIndex = array_rand(MediaTypes::get()->toArray());

        $users = Users::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'title'=>substr($this->faker->text,0,8),
            'type_id'=>$types[$typeIndex]['id'],
            'user_id'=>$users[$userIndex]['id']
        ];
    }
}
