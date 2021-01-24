<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Events
 *
 * @property int $id
 * @property string $title
 * @property string $event_time
 * @property string $details
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|Events newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Events newQuery()
 * @method static \Illuminate\Database\Query\Builder|Events onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Events query()
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereEventTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Events whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Events withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Events withoutTrashed()
 * @mixin \Eloquent
 */
class Events extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'event_time',
        'details'
    ];

}
