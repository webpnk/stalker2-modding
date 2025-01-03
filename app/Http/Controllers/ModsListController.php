<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ModPublicResource;
use App\Models\Mod;
use Inertia\Inertia;
use MichalOravec\PaginateRoute\PaginateRoute;

class ModsListController extends Controller
{
    public function __invoke(PaginateRoute $paginateRoute)
    {
        $mods = Mod::query()
            ->with('media')
            ->orderBy('published_at', 'desc')
            ->paginate();

        return Inertia::render('ModsPage', [
            'mods' => ModPublicResource::collection($mods),
            'links' => $paginateRoute->allUrls($mods),
        ]);
    }
}
