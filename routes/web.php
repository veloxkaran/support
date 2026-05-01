<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketActivityController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('tickets', TicketController::class);
    Route::post('/tickets/{ticket}/activities', [TicketActivityController::class, 'store'])->name('tickets.activities.store');
    
    Route::resource('sop-tasks', \App\Http\Controllers\SopTaskController::class)->except(['create', 'show', 'edit']);

    Route::get('/organizations/members', [OrganizationController::class, 'members'])->name('organizations.members');
    Route::post('/organizations/invitations', [\App\Http\Controllers\OrganizationInvitationController::class, 'store'])->name('organizations.invitations.store');
    Route::post('/invitations/{invitation}/accept', [\App\Http\Controllers\OrganizationInvitationController::class, 'accept'])->name('invitations.accept');
    Route::post('/invitations/{invitation}/decline', [\App\Http\Controllers\OrganizationInvitationController::class, 'decline'])->name('invitations.decline');
    Route::get('/chat', [\App\Http\Controllers\ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/messages/{organization}', [\App\Http\Controllers\ChatController::class, 'fetchMessages'])->name('chat.messages');
    Route::post('/chat/messages/{organization}', [\App\Http\Controllers\ChatController::class, 'sendMessage'])->name('chat.messages.store');
});

require __DIR__.'/auth.php';
