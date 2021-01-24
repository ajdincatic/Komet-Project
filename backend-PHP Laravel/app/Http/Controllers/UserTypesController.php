<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserTypesInsertRequest;
use App\Http\Requests\UserUpsertRequest;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Http\Request;

class UserTypesController extends Controller
{
    function getAll(){
        $types = UserTypes::get();
        return response()->json($types,200);
    }

    function insert(UserTypesInsertRequest $request){
        $type = new UserTypes();
        $type->type_name = $request->type_name;
        $type->save();
        return response()->json($type, 200);
    }
}
