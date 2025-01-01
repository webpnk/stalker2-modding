<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use TomatoPHP\FilamentCms\Models\Post;

/**
 * @mixin Post
 */
class PostResource extends JsonResource
{
    public static $wrap = false;

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'seo_description' => $this->short_description,
            'published_at' => $this->published_at,
            'cover_image' => $this->getMedia('cover_image')->first()?->getUrl(),
            'category' => $this->whenLoaded('categories',
                fn () => new CategoryResource($this->categories->first())
            ),
        ];
    }
}
