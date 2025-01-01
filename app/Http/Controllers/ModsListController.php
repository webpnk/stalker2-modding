<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ModPublicResource;
use App\Models\Mod;
use Inertia\Inertia;

class ModsListController extends Controller
{
    public function __invoke()
    {
        $mods = Mod::query()
            ->with('media')
            ->orderBy('published_at', 'desc')
            ->paginate();

        return Inertia::render('ModsPage', [
            'mods' => ModPublicResource::collection($mods),
        ]);
    }
}
