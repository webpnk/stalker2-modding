<?php

declare(strict_types=1);

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use TomatoPHP\FilamentCms\Models\Category;
use TomatoPHP\FilamentCms\Models\Post;

class BlogListController extends Controller
{
    public function __invoke(?Category $category = null)
    {
        $posts = Post::query()
            ->with('categories')
            ->when($category !== null,
                fn (Builder $query) => $query->whereHas('categories', fn ($c) => $c->where('id', $category->id))
            )
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate();

        $categories = Category::query()
            ->withCount('posts')
            ->where('is_active', true)
            ->where('show_in_menu', true)
            ->orderBy('posts_count')
            ->get();

        return Inertia::render('Blog/BlogListPage', [
            'posts' => PostResource::collection($posts),
            'categories' => CategoryResource::collection($categories),
            'category' => $category ? new CategoryResource($category) : null,
        ]);
    }
}
