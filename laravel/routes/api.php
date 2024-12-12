<?php

use App\Http\Controllers\Api\App\AppReserveController;
use App\Http\Controllers\Api\App\AppSettingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReserveController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/user/register', [AuthController::class, 'userRegister']);
Route::post('/user/login', [AuthController::class, 'userLogin']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/logout', [AuthController::class, 'userLogout']);

    // reserve
    Route::get('/reserve/{reserve_id}', [ReserveController::class, 'getReserve'])->where('reserve_id', '[0-9]+');
    Route::get('/reserves', [ReserveController::class, 'getReserves']);
    Route::post('/reserves', [ReserveController::class, 'createReserve']);
    Route::put('/reserve/{reserve_id}', [ReserveController::class, 'updateReserve'])->where('reserve_id', '[0-9]+');
    Route::delete('/reserve/{reserve_id}', [ReserveController::class, 'deleteReserve'])->where('reserve_id', '[0-9]+');

    // setting
    Route::get('/store_setting', [SettingController::class, 'getStoreSetting']);
    Route::put('/store_setting', [SettingController::class, 'updateStoreSetting']);
    Route::get('/reserve_setting', [SettingController::class, 'getReserveSetting']);
    Route::put('/reserve_setting', [SettingController::class, 'updateReserveSetting']);
});


// アプリ用ルート
Route::middleware(['app.auth'])->group(function () {
    Route::prefix('/app/{uuid}')->where(['uuid' => '[a-zA-Z0-9_-]+'])->group(function () {
        // setting
        Route::get('/auth', [AppSettingController::class, 'getAppSettings']);

        // reserve
        Route::get('/reserves/dates', [AppReserveController::class, 'getReserveAvailableDates']);
    });
});
