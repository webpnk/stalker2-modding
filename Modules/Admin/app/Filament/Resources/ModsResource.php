<?php

namespace Modules\Admin\Filament\Resources;

use App\Models\Mod;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Modules\Admin\Filament\Resources\ModsResource\Pages;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use SolutionForest\FilamentTranslateField\Forms\Component\Translate;

class ModsResource extends Resource
{
    protected static ?string $model = Mod::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Translate::make([
                    TextInput::make('name'),
                    Textarea::make('summary'),
                ])->locales(['en', 'uk']),

                Select::make('related posts')
                    ->relationship('relatedPosts',
                        "title",
                        modifyQueryUsing: function (Builder $query) {
                            return $query->select('posts.id', 'posts.title');
                        }
                    )
                    ->multiple(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->limit(30)->searchable(),
                Tables\Columns\TextColumn::make('summary')->limit(50),
                Tables\Columns\TextColumn::make('author'),
                Tables\Columns\TextColumn::make('published_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMods::route('/'),
            'create' => Pages\CreateMods::route('/create'),
            'edit' => Pages\EditMods::route('/{record}/edit'),
        ];
    }
}
