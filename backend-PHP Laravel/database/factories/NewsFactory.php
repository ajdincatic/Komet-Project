<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\NewsSubfolders;
use App\Models\NewsTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = News::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $subfolders = NewsSubfolders::get()->toArray();
        $subfolderIndex = array_rand(NewsSubfolders::get()->toArray());

        return [
            'title'=>substr($this->faker->text,0,8),
            'news_subfolder_id'=>$subfolders[$subfolderIndex]['id']
        ];
    }
}
