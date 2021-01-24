<?php

namespace Database\Factories;

use App\Models\ForumCategories;
use App\Models\ForumReplies;
use App\Models\ForumTopics;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumRepliesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ForumReplies::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ForumTopics::get()->toArray();
        $typeIndex = array_rand(ForumTopics::get()->toArray());

        $users = Users::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'comment'=>substr($this->faker->text,0,8),
            'topic_id'=>$types[$typeIndex]['id'],
            'user_id'=>$users[$userIndex]['id']
        ];
    }
}
