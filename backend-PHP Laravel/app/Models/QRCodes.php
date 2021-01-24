<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\QRCodes
 *
 * @property int $id
 * @property string $code
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes newQuery()
 * @method static \Illuminate\Database\Query\Builder|QRCodes onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes query()
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|QRCodes whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|QRCodes withTrashed()
 * @method static \Illuminate\Database\Query\Builder|QRCodes withoutTrashed()
 * @mixin \Eloquent
 */
class QRCodes extends Model
{
    use HasFactory;

    protected $table = 'qr_codes';
}
