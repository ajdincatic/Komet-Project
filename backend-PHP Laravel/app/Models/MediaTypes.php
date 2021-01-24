<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\MediaTypes
 *
 * @property int $id
 * @property string $type_name
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes newQuery()
 * @method static \Illuminate\Database\Query\Builder|MediaTypes onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes query()
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes whereTypeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MediaTypes whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|MediaTypes withTrashed()
 * @method static \Illuminate\Database\Query\Builder|MediaTypes withoutTrashed()
 * @mixin \Eloquent
 */
class MediaTypes extends Model
{
    use HasFactory, SoftDeletes;
}
