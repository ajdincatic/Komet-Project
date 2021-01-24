<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Medias
 *
 * @property int $id
 * @property string $title
 * @property string $link
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $media_category_name
 * @property-read mixed $media_type_name
 * @property-read \App\Models\MediaCategories $mediaCategory
 * @method static \Illuminate\Database\Eloquent\Builder|Medias newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Medias newQuery()
 * @method static \Illuminate\Database\Query\Builder|Medias onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Medias query()
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Medias whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Medias withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Medias withoutTrashed()
 * @mixin \Eloquent
 */
class Medias extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'title',
      'category_id'
    ];

    protected $appends = ['media_category_name', 'media_type_name'];

    function getMediaCategoryNameAttribute(){
        return !empty($this->mediaCategory)?$this->mediaCategory->title:null;
    }

    function getMediaTypeNameAttribute(){
        return !empty($this->mediaCategory)?$this->mediaCategory->media_type_name:null;
    }

    public function mediaCategory(){
        return $this->belongsTo(MediaCategories::class, 'category_id');
    }

    protected $hidden = [
        'mediaCategory'
    ];
}
