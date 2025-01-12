<?php

declare(strict_types=1);

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use Inertia\Inertia;
use TomatoPHP\FilamentCms\Models\Category;
use TomatoPHP\FilamentCms\Models\Post;

class BlogPostController extends Controller
{
    public function __invoke(Category $category, Post $post)
    {
        if (!$post->is_published || !$category->is_active) {
            abort(404);
        }

        $post->load(['media', 'categories']);

        $neighbors = Post::query()
            ->with(['media', 'categories'])
            ->where('is_published', true)
            ->whereHas('categories', fn ($q) => $q->where('is_active', true))
            ->orderByRaw("(id > ?) desc, id asc", [$post->id])
            ->limit(3)
            ->get();

        $images = $post
            ->getMedia('images')
            ->map->getUrl();

        return Inertia::render('Blog/BlogPost', [
            'category' => new CategoryResource($category),
            'post' => new PostResource($post),
            'images' => config('app.debug') ? $images : [],
            'suggestions' => PostResource::collection($neighbors),
        ]);
    }
}
