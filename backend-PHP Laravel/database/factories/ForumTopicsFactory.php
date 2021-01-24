<?php

namespace Database\Factories;

use App\Models\ForumCategories;
use App\Models\ForumTopics;
use App\Models\MediaTypes;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumTopicsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ForumTopics::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ForumCategories::get()->toArray();
        $typeIndex = array_rand(ForumCategories::get()->toArray());

        $users = Users::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'title'=>substr($this->faker->text,0,8),
            'question'=>substr($this->faker->text,0,8),
            'category_id'=>$types[$typeIndex]['id'],
            'creator_id'=>$users[$userIndex]['id']
        ];
    }
}
