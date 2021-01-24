<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\NewsTypes
 *
 * @property int $id
 * @property string $type_name
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes newQuery()
 * @method static \Illuminate\Database\Query\Builder|NewsTypes onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes whereTypeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsTypes whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|NewsTypes withTrashed()
 * @method static \Illuminate\Database\Query\Builder|NewsTypes withoutTrashed()
 * @mixin \Eloquent
 */
class NewsTypes extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'type_name'
    ];
}
