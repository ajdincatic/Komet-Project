<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportedBugsUpsertRequest;
use App\Models\Countries;
use App\Models\ReportedBugs;
use App\Models\Users;
use Illuminate\Http\Request;

class ReportedBugsController extends Controller
{
    function getAll(){
        return response()->json(ReportedBugs::with('user')->get(), 200);
    }

    function getById($id){
        $item = ReportedBugs::where('id',$id)->first();
        return response()->json($item,200);
    }

    function insert(ReportedBugsUpsertRequest $request){
        $newItem = new ReportedBugs();
        $newItem->fill($request->all());
        if($request->file('image'))
            $newItem->attachment_path = $request->file('image')->store('img', 'public');
        $newItem->save();
        return response()->json($newItem, 200);
    }

    function delete($id){
        $item = ReportedBugs::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item, 200);
    }
}
