<?php

namespace Database\Seeders;

use App\Models\Countries;
use App\Models\Events;
use App\Models\ForumCategories;
use App\Models\ForumReplies;
use App\Models\ForumTopics;
use App\Models\MediaCategories;
use App\Models\Medias;
use App\Models\News;
use App\Models\NewsSubfolders;
use App\Models\Notifications;
use App\Models\ReportedBugs;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTypesSeeder::class);
        $this->call(NewsTypesSeeder::class);
        $this->call(MediaTypesSeeder::class);

        Countries::factory(10)->create();
        Events::factory(10)->create();
        Users::factory(10)->create();
        NewsSubfolders::factory(10)->create();
        News::factory(10)->create();
        MediaCategories::factory(10)->create();
        Medias::factory(10)->create();
        ForumCategories::factory(10)->create();
        ForumTopics::factory(10)->create();
        ForumReplies::factory(10)->create();
        Notifications::factory(10)->create();
        ReportedBugs::factory(10)->create();
    }
}
