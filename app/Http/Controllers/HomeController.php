<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ModPublicResource;
use App\Http\Resources\PostResource;
use App\Models\DashboardInsight;
use App\Models\Mod;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use TomatoPHP\FilamentCms\Models\Category;
use TomatoPHP\FilamentCms\Models\Post;

class HomeController extends Controller
{
    public function __invoke()
    {
        $dashboardInsights = DashboardInsight::all()->mapWithKeys(
            fn ($dashboardInsight) => [$dashboardInsight->key => $dashboardInsight->value],
        );

        $recentPosts = Post::query()
            ->with('categories')
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->take(4)
            ->get();

        /** @var Collection<int, Post> $dashboardPosts */
        $dashboardPosts = Category::query()
            ->where('slug', '=', '_dashboard')
            ->with('posts')
            ->sole()
            ->posts;

        $latestMods = Mod::query()
            ->orderBy('published_at', 'desc')
            ->limit(4)
            ->get();

        return Inertia::render('Home', [
            'insights' => $dashboardInsights,
            'recentPosts' => PostResource::collection($recentPosts),
            'dashboardPosts' => [
                'about' => new PostResource($dashboardPosts->first(fn (Post $post) => $post->slug === '_about')),
                'focus' => new PostResource($dashboardPosts->first(fn (Post $post) => $post->slug === '_focus')),
            ],
            'latestMods' => ModPublicResource::collection($latestMods),
        ]);
    }
}
