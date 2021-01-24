<?php

namespace Database\Factories;

use App\Models\Countries;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountriesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Countries::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->country,
            'country_code'=>$this->faker->countryCode,
        ];
    }
}
