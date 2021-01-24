<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ForumCategories
 *
 * @property int $id
 * @property string $title
 * @property int $creator_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $creator
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories newQuery()
 * @method static \Illuminate\Database\Query\Builder|ForumCategories onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories query()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumCategories whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|ForumCategories withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ForumCategories withoutTrashed()
 * @mixin \Eloquent
 */
class ForumCategories extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'title',
      'creator_id'
    ];

    protected $appends = ['creator'];
    function getCreatorAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class,'creator_id');
    }

    protected $hidden = [
      'user'
    ];
}
