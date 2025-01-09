<?php

namespace App\Providers;

use App\AI\CohereClient;
use GuzzleHttp\Client;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use MichalOravec\PaginateRoute\PaginateRouteFacade as PaginateRoute;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CohereClient::class, function (Application $app) {
            return new CohereClient(
                config('services.cohere.api_url'),
                config('services.cohere.api_key'),
                config('services.cohere.trial'),
                $app->make(Client::class),
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        PaginateRoute::registerMacros();

        URL::formatPathUsing(fn ($path) => "$path/");

        Vite::prefetch(concurrency: 3);

        if (config('app.static_mode')) {
            Vite::createAssetPathsUsing(
                fn ($path, $secure = null) => URL::assetFrom(config('app.static_asset_url'), $path, true)
            );
        }
    }
}
