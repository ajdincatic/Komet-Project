<?php

namespace Database\Factories;

use App\Models\Notifications;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notifications::class;

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
            'topic'=>substr($this->faker->text,0,15),
            'message'=>substr($this->faker->text,0,15),
            'file_path'=>"test",
        ];
    }
}
