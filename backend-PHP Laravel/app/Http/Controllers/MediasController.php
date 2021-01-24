<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaCategoriesInsertRequest;
use App\Http\Requests\MediasInsertRequest;
use App\Http\Requests\MediaTypesInsertRequest;
use App\Http\Requests\NewsInsertRequest;
use App\Http\Requests\PhotoInsertRequest;
use App\Http\Requests\VideoInsertRequest;
use App\Models\MediaCategories;
use App\Models\Medias;
use App\Models\MediaTypes;
use App\Models\News;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class MediasController extends Controller
{
    function getAllTypes(){
        return response()->json(MediaTypes::get(), 200);
    }

    function insertType(MediaTypesInsertRequest $request){
        $item = new MediaTypes();
        $item->type_name = $request->type_name;
        $item->save();
        return response()->json($item,200);
    }

    function getAllCategories(){
        return response()->json(MediaCategories::get(), 200);
    }

    function getAllCategoriesPhotos(){
        return response()->json(MediaCategories::where('type_id',MediaTypes::where('type_name','PHOTO')->first()->id)->get(), 200);
    }

    function getAllCategoriesVideos(){
        return response()->json(MediaCategories::where('type_id',MediaTypes::where('type_name','VIDEO')->first()->id)->get(), 200);
    }

    function getAllCategoriesTeamVideos(){
        return response()->json(MediaCategories::where('type_id',MediaTypes::where('type_name','TEAM VIDEO')->first()->id)->get(), 200);
    }

    function insertCategories(MediaCategoriesInsertRequest $request){
        $item = new MediaCategories();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function updateCategories($id, MediaCategoriesInsertRequest $request){
        $item = MediaCategories::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function deleteCategories($id){
        $item = MediaCategories::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item, 200);
    }

    function getAll(){
        return response()->json(Medias::get(), 200);
    }

    function getById($id){
        $item = Medias::where('id',$id)->first();
        return response()->json($item,200);
    }

    function getAllPhotos(){
        $news = Medias::whereHas('mediaCategory', function (Builder $query) {
            $query->where('media_categories.type_id','=',MediaTypes::where('type_name','PHOTO')->first()->id);
        })->get();
        return response()->json($news, 200);
    }

    function getAllVideos(){
        $news = Medias::whereHas('mediaCategory', function (Builder $query) {
            $query->where('media_categories.type_id','=',MediaTypes::where('type_name','VIDEO')->first()->id);
        })->get();
        return response()->json($news, 200);
    }

    function getAllTeamVideos(){
        $news = Medias::whereHas('mediaCategory', function (Builder $query) {
            $query->where('media_categories.type_id','=',MediaTypes::where('type_name','TEAM VIDEO')->first()->id);
        })->get();
        return response()->json($news, 200);
    }

    function insertPhoto(PhotoInsertRequest $request){
        $item = new Medias();
        $item->fill($request->all());
        $item->link = "/storage/{$request->file('image')->store('img', 'public')}";;
        $item->save();
        return response()->json($item,200);
    }

    function insertVideo(VideoInsertRequest $request){
        $item = new Medias();
        $item->fill($request->all());
        $item->link = $request->url;
        $item->save();
        return response()->json($item,200);
    }

    function updatePhoto($id, PhotoInsertRequest $request){
        $item = Medias::where('id',$id)->first();
        $item->fill($request->all());
        $item->link = "/storage/{$request->file('image')->store('img', 'public')}";;
        $item->save();
        return response()->json($item,200);
    }

    function updateVideo($id, VideoInsertRequest $request){
        $item = Medias::where('id',$id)->first();
        $item->fill($request->all());
        $item->link = $request->url;
        $item->save();
        return response()->json($item,200);
    }

    function delete($id){
        $item = Medias::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item, 200);
    }
}
