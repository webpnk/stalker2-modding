<?php

namespace App\Console\Commands;

use App\Models\Mod;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use TomatoPHP\FilamentCms\Models\Category;
use TomatoPHP\FilamentCms\Models\Post;

class SitemapGenerate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create();

        $sitemap->add(route('home'));

        $sitemap->add(
            Url::create(route('mods.list'))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        $mods = Mod::all();

        foreach ($mods as $mod) {
            $sitemap->add(
                Url::create(route('mods.info', $mod->id))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_NEVER)
                    ->setLastModificationDate($mod->updated_at)
            );
        }

        $sitemap->add(
            Url::create(route('blog.list'))
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        $posts = Post::query()
            ->with('categories')
            ->where('is_published', true);

        foreach ($posts as $post) {
            $sitemap->add(
                Url::create(route('blog.post', $post->category->slug, $post->slug))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_NEVER)
                    ->setLastModificationDate($post->updated_at)
            );
        }

        $categories = Category::query()
            ->where('is_active', true)
            ->where('show_in_menu', true)
            ->get();

        foreach ($categories as $category) {
            $sitemap->add(
                Url::create(route('blog.list', $category->slug))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
            );
        }

        $sitemap->writeToFile('public/sitemap.xml');
    }
}
