<?php

use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// login
Route::post('users/login', '\App\Http\Controllers\UsersController@login');
Route::post('users/google/login', '\App\Http\Controllers\UsersController@googleLogin');
Route::post('resetPassword/email', '\App\Http\Controllers\UsersController@resetPasswordSendEmail');
Route::post('resetPassword/code', '\App\Http\Controllers\UsersController@resetPasswordCheckCode');
Route::post('resetPassword', '\App\Http\Controllers\UsersController@resetPasswordSetNew');

// registration
Route::post('users', '\App\Http\Controllers\UsersController@insert');

// QR Code login
Route::get('users/generateQRCode/{id}', '\App\Http\Controllers\UsersController@generateQRCode');
Route::post('users/loginQRCode', '\App\Http\Controllers\UsersController@loginWithQRCode');

// email verification
Route::get('email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');

// country
Route::get('countries','\App\Http\Controllers\CountriesController@getAll');

Route::get('users/types', '\App\Http\Controllers\UserTypesController@getAll');

Route::group(['middleware'=>'auth:api'],function () {

    // email verification
    Route::get('email/resend', '\App\Http\Controllers\VerificationController@resend')->name('verification.resend');

    // users
    Route::get('users/employees', '\App\Http\Controllers\UsersController@getEmployees');
    Route::get('users/representatives', '\App\Http\Controllers\UsersController@getRepresentative');
    Route::get('news/subfolders','\App\Http\Controllers\NewsController@getAllSubfolders');
    Route::get('news/type/{typeId}/subfolders','\App\Http\Controllers\NewsController@getAllSubfolderByType');
    Route::get('news/subfolder/{subfolderId}/news','\App\Http\Controllers\NewsController@getNewsBySubfolder');

    Route::get('news','\App\Http\Controllers\NewsController@getAll');
    Route::get('news/clientNews','\App\Http\Controllers\NewsController@getAllClientNews');
    Route::get('news/teamNews','\App\Http\Controllers\NewsController@getAllTeamNews');

    Route::get('forum/categories','\App\Http\Controllers\ForumCategoriesController@getAll');

    Route::get('forum/topics','\App\Http\Controllers\ForumTopicsController@getAll');

    Route::get('forum/topics/{topic_id}/replies','\App\Http\Controllers\ForumRepliesController@getAll');
    Route::get('forum/topics/replies/{id}','\App\Http\Controllers\ForumRepliesController@getById');
    Route::post('forum/topics/{topic_id}/replies','\App\Http\Controllers\ForumRepliesController@insert');
    Route::put('forum/topics/replies/{id}','\App\Http\Controllers\ForumRepliesController@update');
    Route::get('forum/category/{category_id}/topics','\App\Http\Controllers\ForumTopicsController@getAllTopicsByCategory');

    Route::get('medias/categories','\App\Http\Controllers\MediasController@getAllCategories');
    Route::get('medias/categories/photos','\App\Http\Controllers\MediasController@getAllCategoriesPhotos');
    Route::get('medias/categories/videos','\App\Http\Controllers\MediasController@getAllCategoriesVideos');
    Route::get('medias/categories/teamVideos','\App\Http\Controllers\MediasController@getAllCategoriesTeamVideos');

    Route::get('medias','\App\Http\Controllers\MediasController@getAll');
    Route::get('medias/photos','\App\Http\Controllers\MediasController@getAllPhotos');
    Route::get('medias/videos','\App\Http\Controllers\MediasController@getAllVideos');
    Route::get('medias/teamVideos','\App\Http\Controllers\MediasController@getAllTeamVideos');

    Route::get('yourNotifications','\App\Http\Controllers\NotificationsController@getYourNotifications');

    Route::get('news/types','\App\Http\Controllers\NewsController@getAllTypes');

    // ADMIN ACTIONS
    Route::group(['middleware'=> '\App\Http\Middleware\CheckAdminMiddleware'],function () {
        // user types
        Route::post('users/types', '\App\Http\Controllers\UserTypesController@insert');

        // users
        Route::get('users', '\App\Http\Controllers\UsersController@getAll');
        Route::get('users/{id}', '\App\Http\Controllers\UsersController@getById');
        Route::put('users/{id}', '\App\Http\Controllers\UsersController@update');
        Route::delete('users/{id}', '\App\Http\Controllers\UsersController@delete');

        // country
        Route::get('countries/{id}','\App\Http\Controllers\CountriesController@getById');
        Route::post('countries','\App\Http\Controllers\CountriesController@insert');
        Route::delete('countries/{id}','\App\Http\Controllers\CountriesController@delete');
        Route::put('countries/{id}','\App\Http\Controllers\CountriesController@update');

        // events
        Route::get('events/{id}','\App\Http\Controllers\EventsController@getById');
        Route::post('events','\App\Http\Controllers\EventsController@insert');
        Route::delete('events/{id}','\App\Http\Controllers\EventsController@delete');
        Route::put('events/{id}','\App\Http\Controllers\EventsController@update');

        // notifications
        Route::get('notifications','\App\Http\Controllers\NotificationsController@getAll');
        Route::get('notifications/{id}','\App\Http\Controllers\NotificationsController@getById');
        Route::post('notifications','\App\Http\Controllers\NotificationsController@insert');

        // reported bugs
        Route::get('reportedBugs','\App\Http\Controllers\ReportedBugsController@getAll');
        Route::get('reportedBugs/{id}','\App\Http\Controllers\ReportedBugsController@getById');
        Route::delete('reportedBugs/{id}','\App\Http\Controllers\ReportedBugsController@delete');

        // NEWS

        // news types
        Route::post('news/types','\App\Http\Controllers\NewsController@insertType');
        // news subfolders
        Route::post('news/subfolders','\App\Http\Controllers\NewsController@insertSubfolder');
        Route::put('news/subfolders/{id}','\App\Http\Controllers\NewsController@updateSubfolder');
        Route::delete('news/subfolders/{id}','\App\Http\Controllers\NewsController@deleteSubfolder');
        // news
        Route::get('news/{id}','\App\Http\Controllers\NewsController@getById');
        Route::post('news','\App\Http\Controllers\NewsController@insert');
        Route::put('news/{id}','\App\Http\Controllers\NewsController@update');
        Route::delete('news/{id}','\App\Http\Controllers\NewsController@delete');

        // forum categories
        Route::get('forum/categories/{id}','\App\Http\Controllers\ForumCategoriesController@getById');
        Route::post('forum/categories','\App\Http\Controllers\ForumCategoriesController@insert');
        Route::put('forum/categories/{id}','\App\Http\Controllers\ForumCategoriesController@update');
        Route::delete('forum/categories/{id}','\App\Http\Controllers\ForumCategoriesController@delete');
        // forum topics
        Route::get('forum/topics/{id}','\App\Http\Controllers\ForumTopicsController@getById');
        Route::post('forum/topics','\App\Http\Controllers\ForumTopicsController@insert');
        Route::put('forum/topics/{id}','\App\Http\Controllers\ForumTopicsController@update');
        Route::delete('forum/topics/{id}','\App\Http\Controllers\ForumTopicsController@delete');
        // forum replies
        Route::delete('forum/topics/replies/{id}','\App\Http\Controllers\ForumRepliesController@delete');

        // media types
        Route::get('medias/types','\App\Http\Controllers\MediasController@getAllTypes');
        Route::post('medias/types','\App\Http\Controllers\MediasController@insertType');
        // media categories
        Route::post('medias/categories','\App\Http\Controllers\MediasController@insertCategories');
        Route::put('medias/categories/{id}','\App\Http\Controllers\MediasController@updateCategories');
        Route::delete('medias/categories/{id}','\App\Http\Controllers\MediasController@deleteCategories');
        // medias
        Route::get('medias/{id}','\App\Http\Controllers\MediasController@getById');
        Route::post('medias/photos','\App\Http\Controllers\MediasController@insertPhoto');
        Route::post('medias/videos','\App\Http\Controllers\MediasController@insertVideo');
        Route::put('medias/photos/{id}','\App\Http\Controllers\MediasController@updatePhoto');
        Route::put('medias/videos/{id}','\App\Http\Controllers\MediasController@updateVideo');
        Route::delete('medias/{id}','\App\Http\Controllers\MediasController@delete');
    });

    // profile
    Route::get('profile/{id}', '\App\Http\Controllers\ProfileController@getProfile')->middleware('verified');
    Route::get('yourProfile', '\App\Http\Controllers\ProfileController@getYourProfile');
    Route::post('profile/{id}/updatePassword', '\App\Http\Controllers\ProfileController@updatePassword');
    Route::post('profile/{id}/updateProfile', '\App\Http\Controllers\ProfileController@updateProfile');

    // dashboard
    Route::get('dashboard','\App\Http\Controllers\DashboardController@getAll');

    Route::get('events','\App\Http\Controllers\EventsController@getAll');

    Route::get('notifications/users/{user_id}','\App\Http\Controllers\NotificationsController@getAllByUser');

    Route::post('reportedBugs','\App\Http\Controllers\ReportedBugsController@insert');
});
