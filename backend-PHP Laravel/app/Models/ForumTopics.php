<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ForumTopics
 *
 * @property int $id
 * @property string $title
 * @property string $question
 * @property int $category_id
 * @property int $creator_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ForumCategories $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ForumReplies[] $forumReplies
 * @property-read int|null $forum_replies_count
 * @property-read mixed $category_title
 * @property-read mixed $creator
 * @property-read mixed $number_of_replies
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics newQuery()
 * @method static \Illuminate\Database\Query\Builder|ForumTopics onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics query()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereCreatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumTopics whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|ForumTopics withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ForumTopics withoutTrashed()
 * @mixin \Eloquent
 */
class ForumTopics extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'title',
      'question',
      'category_id',
      'creator_id'
    ];

    protected $appends = ['creator', 'number_of_replies'];
    function getCreatorAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class,'creator_id');
    }

    function getNumberOfRepliesAttribute(){
        return $this->forumReplies->count();
    }

    public function forumReplies(){
        return $this->hasMany(ForumReplies::class,'topic_id');
    }

    protected $hidden = [
        'user',
        'category',
        'forumReplies'
    ];
}
