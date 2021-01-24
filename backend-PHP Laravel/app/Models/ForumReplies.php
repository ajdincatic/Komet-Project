<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ForumReplies
 *
 * @property int $id
 * @property string $comment
 * @property int $user_id
 * @property int $topic_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $topic_title
 * @property-read mixed $user_name
 * @property-read \App\Models\ForumTopics $topic
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies newQuery()
 * @method static \Illuminate\Database\Query\Builder|ForumReplies onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies query()
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereTopicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ForumReplies whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|ForumReplies withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ForumReplies withoutTrashed()
 * @mixin \Eloquent
 */
class ForumReplies extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'comment',
      'user_id',
    ];

    protected $appends = ['user_name', 'topic_title'];
    function getUserNameAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class,'user_id');
    }

    function getTopicTitleAttribute(){
        return $this->topic->title;
    }

    public function topic(){
        return $this->belongsTo(ForumTopics::class,'topic_id');
    }

    protected $hidden = [
        'topic',
        'user'
    ];
}
