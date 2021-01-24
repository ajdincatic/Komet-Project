<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationsInsertRequest;
use App\Models\Notifications;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    function getAll(){
        return response()->json(Notifications::get());
    }

    function getAllByUser($user_id){
        $user = Users::where('id',$user_id)->first();
        $notifications = null;
        if($user)
            $notifications = Notifications::where('user_type_id', $user->user_type_id)
                ->orWhere('user_type_id', null)->get();
        return response()->json($notifications);
    }

    function getYourNotifications(){
        $user = Users::where('id',Auth::user()->id)->first();
        $notifications = null;
        if($user)
            $notifications = Notifications::where('user_type_id', $user->user_type_id)
                ->orWhere('user_type_id', null)->get();
        return response()->json($notifications);
    }

    function getById($id){
        return response()->json(Notifications::where('id',$id)->first());
    }

    function insert(NotificationsInsertRequest $request){
        $item = new Notifications();
        $item->fill($request->all());
        $item->file_path = "/storage/{$request->file('image')->store('img', 'public')}";
        $item->save();
        return response($item);
    }
}
