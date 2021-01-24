<?php

namespace Database\Factories;

use App\Models\Countries;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UsersFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Users::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $countries = Countries::get()->toArray();
        $countryIndex = array_rand(Countries::get()->toArray());

        $users = UserTypes::get()->toArray();
        $userIndex = array_rand($users);

        return [
            'first_name'=>$this->faker->firstName,
            'last_name'=>$this->faker->lastName,
            'email'=>$this->faker->unique()->safeEmail,
            'email_verified_at'=>now(),
            'password'=>Hash::make($this->faker->password),
            'address'=>$this->faker->address,
            'phone'=>$this->faker->phoneNumber,
            'country_id'=>$countries[$countryIndex]['id'],
            'user_type_id'=>$users[$userIndex]['id'],
            'photo_path'=>'/storage/img/test.jpg'
        ];
    }
}
