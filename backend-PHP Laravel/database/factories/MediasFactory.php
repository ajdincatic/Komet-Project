<?php

namespace Database\Factories;

use App\Models\MediaCategories;
use App\Models\Medias;
use App\Models\MediaTypes;
use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediasFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Medias::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = MediaCategories::get()->toArray();
        $categoryIndex = array_rand($categories);

        return [
            'title'=>substr($this->faker->text,0,8),
            'category_id'=>$categories[$categoryIndex]['id'],
            'link'=>'test'
        ];
    }
}
