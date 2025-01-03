<?php

use Illuminate\Support\Facades\Route;

Route::localized(function () {
    Route::get('/', \App\Http\Controllers\HomeController::class)->name('home');

    Route::paginate('/read/{category:slug?}', \App\Http\Controllers\Blog\BlogListController::class)->name('blog.list');
    Route::get('/read/{category:slug}/{post:slug}', \App\Http\Controllers\Blog\BlogPostController::class)
        ->name('blog.post');

    Route::paginate('/mods/minor-improvements', \App\Http\Controllers\ModsListController::class)->name('mods.list');
    Route::get('/mods/minor-improvements/{mod:id}', \App\Http\Controllers\ModInfoController::class)->name('mods.info');
});
