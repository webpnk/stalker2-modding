<?php

declare(strict_types=1);

namespace App\Services\Nexusmod;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;

class NexusmodClient
{
    private string $gameId = 'stalker2heartofchornobyl';

    public function getLatestMods(): array
    {
        $mods = Http::baseUrl($this->getBaseUrl())
            ->withHeader('apikey', $this->getApiKey())
            ->get("/games/{$this->gameId}/mods/latest_added.json")
            ->json();

        return Arr::where($mods,
            fn (array $mod) => $mod['status'] === 'published' && isset($mod['name'])
        );
    }

    public function getTrendingMods(): array
    {
        $mods = Http::baseUrl($this->getBaseUrl())
            ->withHeader('apikey', $this->getApiKey())
            ->get("/games/{$this->gameId}/mods/trending.json")
            ->json();

        return Arr::where($mods,
            fn (array $mod) => $mod['status'] === 'published' && isset($mod['name'])
        );
    }

    private function getBaseUrl(): string
    {
        return config('services.nexusmod.base_url');
    }

    private function getApiKey(): string
    {
        return config('services.nexusmod.api_key');
    }
}
