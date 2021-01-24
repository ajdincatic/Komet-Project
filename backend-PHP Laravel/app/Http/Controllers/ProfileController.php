<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Mockery\Generator\StringManipulation\Pass\Pass;

class ProfileController extends Controller
{
    function getProfile($id){
        $user = Users::where('id',$id)->first();
        return response()->json($user,200);
    }

    function getYourProfile(){
        $user = Users::where('id',Auth::user()->id)->first();
        return response()->json($user,200);
    }

    function updateProfile($id, ProfileUpdateRequest $request){
        $user = Users::where('id',$id)->first();
        $user->fill($request->all());
        if($request->image)
            $user->photo_path = "/storage/{$request->file('image')->store('img', 'public')}";
        $user->save();
        return response()->json($user,200);
    }

    function updatePassword($id ,PasswordUpdateRequest $request){
        $user = Users::where('id',$id)->first();
        if(!Hash::check($request->current_password, $user->password))
            return response()->json([
                "Error" => "Wrong current password."
            ], 500);

        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json($user, 200);
    }
}
