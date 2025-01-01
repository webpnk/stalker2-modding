<?php

namespace Modules\Admin\Filament\Resources;

use Filament\Actions\LocaleSwitcher;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Concerns\Translatable;
use Modules\Admin\Filament\Resources\DashboardInsightResource\Pages;
use Modules\Admin\Filament\Resources\DashboardInsightResource\RelationManagers;
use App\Models\DashboardInsight as DashboardInsightModel;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use SolutionForest\FilamentTranslateField\Forms\Component\Translate;

class DashboardInsightResource extends Resource
{
    use Translatable;

    protected static ?string $model = DashboardInsightModel::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getTranslatableLocales(): array
    {
        return ['en', 'ua'];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('key')->options([
                    DashboardInsightModel::KEY_GAME_VERSION => 'Game Version',
                    DashboardInsightModel::KEY_LAST_PATCH_DATE => 'Last Patch Date',
                    DashboardInsightModel::KEY_SDK_STATUS => 'SDK Status',
                    DashboardInsightModel::KEY_SDK_PHASE => 'SDK Phase',
                    DashboardInsightModel::SDK_FORECAST => 'SDK Forecast',
                ]),
                Translate::make([
                    Textarea::make('value'),
                ])->locales(['en', 'uk']),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key'),
                Tables\Columns\Layout\Panel::make([
                    Tables\Columns\TextColumn::make('data')
                        ->getStateUsing(fn ($record) => $record->setVisible(['value'])->toJson(JSON_UNESCAPED_UNICODE)),
                ]),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageDashboardInsights::route('/'),
        ];
    }
}
