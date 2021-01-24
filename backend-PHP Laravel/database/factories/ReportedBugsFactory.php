<?php

namespace Database\Factories;

use App\Models\ForumCategories;
use App\Models\ReportedBugs;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportedBugsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ReportedBugs::class;

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
            'message'=>substr($this->faker->text,0,15),
            'user_creator_id'=>$users[$userIndex]['id']
        ];
    }
}
