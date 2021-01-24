<?php

namespace App\Http\Controllers;

use App\Http\Requests\CountryUpsertRequest;
use App\Models\Countries;
use Faker\Provider\DateTime;
use Illuminate\Http\Request;

class CountriesController extends Controller
{
    function getAll(){
        return response()->json(Countries::get(), 200);
    }

    function getById($id){
        return response()->json(Countries::findOrFail($id), 200);
    }

    function insert(CountryUpsertRequest $request){
        $newItem = new Countries();
        $newItem->fill($request->all());
        $newItem->save();
        return response()->json($newItem, 200);
    }

    function update($id, CountryUpsertRequest $request){
        $item = Countries::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item, 200);
    }

    function delete($id){
        $item = Countries::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item,200);
    }
}
