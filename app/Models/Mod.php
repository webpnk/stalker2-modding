<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Translatable\HasTranslations;

/**
 * @property int $id
 * @property string $name
 * @property string $summary
 * @property string $description
 * @property string $mod_id
 * @property string $author
 * @property Carbon $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Mod extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasTranslations;

    protected $fillable = [
        'name',
        'summary',
        'description',
        'mod_id',
        'author',
        'published_at',
    ];

    public array $translatable = ['name', 'summary'];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->performOnCollections('picture')
            ->format('webp');
    }
}