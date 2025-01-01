<?php

namespace Modules\Admin\Filament\Resources\DashboardInsightResource\Pages;

use Modules\Admin\Filament\Resources\DashboardInsightResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageDashboardInsights extends ManageRecords
{
    protected static string $resource = DashboardInsightResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
