<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForumCategoriesUpsertRequest;
use App\Models\ForumCategories;
use Illuminate\Http\Request;

class ForumCategoriesController extends Controller
{
    function getAll(){
        return response()->json(ForumCategories::get());
    }

    function getById($id){
        return response(ForumCategories::where('id',$id)->first());
    }

    function insert(ForumCategoriesUpsertRequest $request){
        $item = new ForumCategories();
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function update($id, ForumCategoriesUpsertRequest $request){
        $item = ForumCategories::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item);
    }

    function delete($id){
        $item = ForumCategories::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item);
    }
}
