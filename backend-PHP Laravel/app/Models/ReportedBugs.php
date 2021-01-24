<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ReportedBugs
 *
 * @property int $id
 * @property string $message
 * @property int $user_creator_id
 * @property string|null $attachment_path
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $creator
 * @property-read \App\Models\Users $user
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs newQuery()
 * @method static \Illuminate\Database\Query\Builder|ReportedBugs onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs query()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereAttachmentPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportedBugs whereUserCreatorId($value)
 * @method static \Illuminate\Database\Query\Builder|ReportedBugs withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ReportedBugs withoutTrashed()
 * @mixin \Eloquent
 */
class ReportedBugs extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'message',
        'user_creator_id'
    ];

    protected $appends = ['creator'];
    function getCreatorAttribute(){
        return "{$this->user->first_name} {$this->user->last_name}";
    }

    public function user(){
        return $this->belongsTo(Users::class, 'user_creator_id');
    }

    protected $hidden = [
        'user',
        'deleted_at'
    ];
}
