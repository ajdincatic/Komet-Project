<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserTypes
 *
 * @property int $id
 * @property string $type_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes whereTypeName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTypes whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class UserTypes extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_name'
    ];
}
