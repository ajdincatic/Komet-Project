<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\News
 *
 * @property int $id
 * @property string $title
 * @property string|null $file_path
 * @property int $news_subfolder_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $news_subfolder_creator
 * @property-read mixed $news_type_name
 * @property-read mixed $subfolder_title
 * @property-read \App\Models\NewsSubfolders $newsSubfolder
 * @method static \Illuminate\Database\Eloquent\Builder|News newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|News newQuery()
 * @method static \Illuminate\Database\Query\Builder|News onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|News query()
 * @method static \Illuminate\Database\Eloquent\Builder|News whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsSubfolderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|News withTrashed()
 * @method static \Illuminate\Database\Query\Builder|News withoutTrashed()
 * @mixin \Eloquent
 */
class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'file_path',
        'news_subfolder_id'
    ];

    protected $appends = ['subfolder_title', 'news_type_name', 'news_subfolder_creator'];
    function getSubfolderTitleAttribute(){
        return $this->newsSubfolder->title;
    }

    function getNewsTypeNameAttribute(){
        return $this->newsSubfolder->news_type_name;
    }

    function getNewsSubfolderCreatorAttribute(){
        return $this->newsSubfolder->creator;
    }

    public function newsSubfolder(){
        return $this->belongsTo(NewsSubfolders::class, 'news_subfolder_id');
    }

    protected $hidden = [
      'newsSubfolder'
    ];
}

