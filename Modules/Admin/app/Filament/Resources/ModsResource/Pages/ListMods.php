<?php

namespace Modules\Admin\Filament\Resources\ModsResource\Pages;

use Modules\Admin\Filament\Resources\ModsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMods extends ListRecords
{
    protected static string $resource = ModsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
