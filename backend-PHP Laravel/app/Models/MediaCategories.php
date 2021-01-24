<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\MediaCategories
 *
 * @property int $id
 * @property string $title
 * @property int $user_id
 * @property int $type_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $media_type_name
 * @property-read mixed $user_full_name
 * @property-read \App\Models\MediaTypes $mediaType
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories newQuery()
 * @method static \Illuminate\Database\Query\Builder|MediaCategories onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories query()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaCategories whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|MediaCategories withTrashed()
 * @method static \Illuminate\Database\Query\Builder|MediaCategories withoutTrashed()
 * @mixin \Eloquent
 */
class MediaCategories extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'title',
      'user_id',
      'type_id'
    ];

    protected $appends = ['media_type_name', 'user_full_name'];
    function getMediaTypeNameAttribute(){
        return $this->mediaType->type_name;
    }

    public function mediaType(){
        return $this->belongsTo(MediaTypes::class, 'type_id');
    }

    function getUserFullNameAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class, 'user_id');
    }

    protected $hidden = [
        'mediaType',
        'user'
    ];
}
