<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ModPublicResource;
use App\Models\Mod;
use Inertia\Inertia;

class ModInfoController extends Controller
{
    public function __invoke(Mod $mod)
    {
        $mod->load(['media', 'relatedPosts', 'relatedPosts.categories']);

        $neighbors = Mod::neighbors($mod->id, 3)->with('media')->get();

        return Inertia::render('ModInfoPage', [
            'mod' => new ModPublicResource($mod),
            'suggestions' => ModPublicResource::collection($neighbors),
        ]);
    }
}
