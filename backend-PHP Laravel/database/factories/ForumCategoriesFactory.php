<?php

namespace Database\Factories;

use App\Models\ForumCategories;
use App\Models\NewsTypes;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumCategoriesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ForumCategories::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = Users::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'title'=>substr($this->faker->text,0,8),
            'creator_id'=>$users[$userIndex]['id']
        ];
    }
}
