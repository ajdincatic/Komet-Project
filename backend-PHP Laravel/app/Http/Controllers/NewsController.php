<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsInsertRequest;
use App\Http\Requests\NewsSubfoldersInsertRequest;
use App\Http\Requests\NewsTypesInsertRequest;
use App\Models\News;
use App\Models\NewsSubfolders;
use App\Models\NewsTypes;
use App\Models\ReportedBugs;
use App\Models\Users;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isTrue;

class NewsController extends Controller
{
    function getAll(){
        return response()->json(News::get(), 200);
    }

    function getAllClientNews(){
        $news = News::whereHas('newsSubfolder', function (Builder $query) {
            $query->where('news_subfolders.news_type_id','=',1);
        })->get();
        return response()->json($news, 200);
    }

    function getAllTeamNews(){
        // two types of join, with and without relation
        //$news = News::join('news_subfolders', function ($join){
        //    $join->on('news.news_subfolder_id', '=', 'news_subfolders.id')
        //        ->where('news_subfolders.news_type_id','=',2);
        //})->get();
        $news = News::whereHas('newsSubfolder', function (Builder $query) {
            $query->where('news_subfolders.news_type_id','=',2);
        })->get();
        return response()->json($news, 200);
    }

    function getNewsBySubfolder($subfolderId){
        return response()->json(News::where('news_subfolder_id',$subfolderId)->get(), 200);
    }

    function getById($id){
        $item = News::where('id',$id)->first();
        return response()->json($item,200);
    }

    function getAllSubfolders(){
        return response()->json(NewsSubfolders::get(), 200);
    }

    function getAllSubfolderByType($typeId){
        return response()->json(NewsSubfolders::where('news_type_id',$typeId)->get(), 200);
    }

    function getAllTypes(){
        return response()->json(NewsTypes::get(), 200);
    }

    function insert(NewsInsertRequest $request){
        $item = new News();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function update($id, NewsInsertRequest $request){
        $item = News::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function updateSubfolder($id, NewsSubfoldersInsertRequest $request){
        $item = NewsSubfolders::where('id',$id)->first();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function insertSubfolder(NewsSubfoldersInsertRequest $request){
        $item = new NewsSubfolders();
        $item->fill($request->all());
        $item->save();
        return response()->json($item,200);
    }

    function insertType(NewsTypesInsertRequest $request){
        $item = new NewsTypes();
        $item->type_name = $request->type_name;
        $item->save();
        return response()->json($item,200);
    }

    function delete($id){
        $item = News::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item, 200);
    }

    function deleteSubfolder($id){
        $item = NewsSubfolders::where('id',$id)->first();
        if($item)
            $item->delete();
        return response()->json($item, 200);
    }
}
