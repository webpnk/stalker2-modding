<?php

namespace App\Console\Commands;

use App\AI\AIModTranslator;
use App\Models\Mod;
use App\Services\Nexusmod\NexusmodClient;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;

class FetchModsFromNexus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-mods';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(NexusmodClient $client, AIModTranslator $translator): int
    {
        $mods = [
            ...$client->getLatestMods(),
            ...$client->getTrendingMods(),
        ];

        $this->info('Fetching ' . count($mods) . ' mods...');

        foreach ($mods as $mod) {
            $modData = Arr::only($mod, ['name', 'summary', 'description', 'uid', 'mod_id', 'author', 'created_time', 'picture_url']);

            $this->table(['Name', 'Summary'], [[$modData['name'], $modData['summary']]]);

            $this->info('Translating mod info...');

            $translated = $translator->translate($modData['name'], $modData['summary'] ?? '');

            $this->table(['Name', 'Summary'], [[$translated['name'], $translated['summary']]]);

            $mod = Mod::query()->updateOrCreate(['mod_id' => $modData['mod_id']], [
                'name' => [
                    'en' => $modData['name'],
                    'uk' => $translated['name'] ?? null,
                ],
                'summary' => [
                    'en' => $modData['summary'] ?? null,
                    'uk' => $translated['summary'] ?? null,
                ],
                'description' => $modData['description'] ?? null,
                'author' => $modData['author'] ?? null,
                'published_at' => $modData['created_time'] ?? now(),
            ]);

            if ($modData['picture_url']) {
                $mod->clearMediaCollection('picture');
                $mod->addMediaFromUrl($modData['picture_url'])->toMediaCollection('picture');
            }

            $this->info('Mod saved: '.$mod->name);
        }

        return 0;
    }
}
