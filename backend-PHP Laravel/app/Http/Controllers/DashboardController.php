<?php

namespace App\Http\Controllers;

use App\Models\DashboardData;
use App\Models\News;
use App\Models\NewsTypes;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function getAll(){
        $data = new DashboardData();
        $data->number_of_users =  Users::where('user_type_id', UserTypes::where('type_name', 'User')->first()->id)->count();
        $data->number_of_employees = Users::where('user_type_id', UserTypes::where('type_name', 'Employee')->first()->id)->count();
        $cnList = News::where('news_subfolder_id', NewsTypes::where('type_name', 'Client News')->first()->id)->get();
        $data->number_of_client_news = $cnList->count();
        $tnList = News::where('news_subfolder_id', NewsTypes::where('type_name', 'Team News')->first()->id)->get();
        $data->number_of_team_news = $tnList->count();

        $nrOfUsers = Users::get()->count();
        $data->users_precentage_graph_data = (object) [
            'precent_of_users'=>$data->number_of_users/$nrOfUsers*100,
            'precent_of_employees'=>$data->number_of_employees/$nrOfUsers*100,
            'precent_of_administrators'=>Users::where('user_type_id', UserTypes::where('type_name', 'Administrator')->first()->id)->count()/$nrOfUsers*100,
        ];
        return response()->json($data);
    }
}
