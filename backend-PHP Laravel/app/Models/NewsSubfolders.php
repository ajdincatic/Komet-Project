<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\NewsSubfolders
 *
 * @property int $id
 * @property string $title
 * @property int $news_type_id
 * @property int $creator_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $creator
 * @property-read mixed $news_type_name
 * @property-read \App\Models\NewsTypes $newsType
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders newQuery()
 * @method static \Illuminate\Database\Query\Builder|NewsSubfolders onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereNewsTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsSubfolders whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|NewsSubfolders withTrashed()
 * @method static \Illuminate\Database\Query\Builder|NewsSubfolders withoutTrashed()
 * @mixin \Eloquent
 */
class NewsSubfolders extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'news_type_id',
        'creator_id'
    ];

    protected $appends = ['news_type_name', 'creator'];
    function getNewsTypeNameAttribute(){
        return $this->newsType->type_name;
    }

    public function newsType(){
        return $this->belongsTo(NewsTypes::class, 'news_type_id');
    }

    function getCreatorAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class, 'creator_id');
    }

    protected $hidden = [
        'newsType',
        'user'
    ];
}
