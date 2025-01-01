<?php

declare(strict_types=1);

namespace App\Http\Controllers;

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

        return Inertia::render('BlogPost', [
            'category' => new CategoryResource($category),
            'post' => new PostResource($post),
        ]);
    }
}
