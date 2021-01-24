<?php

namespace App\Http\Controllers;

use App\Http\Requests\CountryUpsertRequest;
use App\Http\Requests\EventUpsertRequest;
use App\Models\Countries;
use App\Models\Events;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    function getAll(){
        return response()->json(Events::get(), 200);
    }

    function getById($id){
        $item = Events::where('id',$id)->first();
        return response()->json($item, 200);
    }

    function insert(EventUpsertRequest $request){
        $newItem = new Events();
        $newItem->fill($request->all());
        $newItem->save();
        return response()->json($newItem, 200);
    }

    function update($id, EventUpsertRequest $request){
        $item = Events::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item, 200);
    }

    function delete($id){
        $item = Events::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item,200);
    }
}
