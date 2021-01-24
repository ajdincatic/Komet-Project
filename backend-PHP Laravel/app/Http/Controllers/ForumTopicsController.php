<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForumTopicsUpsertRequest;
use App\Models\ForumTopics;
use Illuminate\Http\Request;

class ForumTopicsController extends Controller
{
    function getAll(){
        return response()->json(ForumTopics::get());
    }

    function getById($id){
        return response(ForumTopics::where('id',$id)->first());
    }

    function getAllTopicsByCategory($category_id){
        return response()->json(ForumTopics::where('category_id',$category_id)->get(), 200);
    }

    function insert(ForumTopicsUpsertRequest $request){
        $item = new ForumTopics();
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function update($id, ForumTopicsUpsertRequest $request){
        $item = ForumTopics::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function delete($id){
        $item = ForumTopics::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item);
    }
}
