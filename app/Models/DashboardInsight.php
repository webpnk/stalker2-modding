<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class DashboardInsight extends Model
{
    use HasTranslations;

    public array $translatable = ['value'];

    public const KEY_GAME_VERSION = 'game_version';
    public const KEY_LAST_PATCH_DATE = 'last_patch_date';
    public const KEY_SDK_STATUS = 'sdk_status';
    public const KEY_SDK_PHASE = 'sdk_phase';
    public const SDK_FORECAST = 'sdk_forecast';

    protected $fillable = [
        'key',
        'value',
    ];
}
