<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Inertia\Middleware;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $localizedUrls = Arr::mapWithKeys(
            config('app.available_locales'),
            function (string $locale) use ($request) {
                try {
                    return [$locale => route($request->route()->getName(), $request->route()->parameters(), locale: $locale)];
                } catch (RouteNotFoundException) {
                    return [$locale => null];
                }
            } ,
        );

        return [
            ...parent::share($request),
            'app' => [
                'name' => config('app.name'),
                'locales' => config('app.available_locales'),
                'currentLocale' => App::currentLocale(),
                'staticMode' => config('app.static_mode'),
            ],
            'localizedUrls' => $localizedUrls,
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
