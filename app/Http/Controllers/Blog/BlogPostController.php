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

        return Inertia::render('Blog/BlogPost', [
            'category' => new CategoryResource($category),
            'post' => new PostResource($post),
        ]);
    }
}
