<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Mod;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Mod
 */
class ModPublicResource extends JsonResource
{
    public static $wrap = false;

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'summary' => $this->summary,
            'description' => $this->description,
            'author' => $this->author,
            'published_at' => $this->published_at,
            'picture_url' => $this->whenLoaded('media',
                fn () => $this->getMedia('picture')->first()?->getUrl('webp'),
            ),
            'source' => 'NexusMods',
            'source_url' => 'https://www.nexusmods.com/stalker2heartofchornobyl/mods/' . $this->mod_id,
        ];
    }
}
