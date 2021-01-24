<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForumReplyUpsertRequest;
use App\Models\ForumReplies;
use Illuminate\Http\Request;

class ForumRepliesController extends Controller
{
    function getAll($topic_id){
        $items = ForumReplies::where('topic_id', $topic_id)->get();
        return response()->json($items);
    }

    function getById($id){
        return response(ForumReplies::where('id',$id)->first());
    }

    function insert($topic_id, ForumReplyUpsertRequest $request){
        $item = new ForumReplies();
        $item->topic_id = $topic_id;
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function update($id, ForumReplyUpsertRequest $request){
        $item = ForumReplies::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function delete($id){
        $item = ForumReplies::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item);
    }
}
