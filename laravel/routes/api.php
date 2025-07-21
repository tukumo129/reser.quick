<?php

use App\Http\Controllers\Api\App\AppReserveController;
use App\Http\Controllers\Api\App\AppSettingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReserveController;
use App\Http\Controllers\Api\ReserveOptionController;
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

Route::post('/user', [AuthController::class, 'createUser']);
Route::post('/user/login', [AuthController::class, 'userLogin']);
Route::post('/user/login/google', [AuthController::class, 'googleLogin']);
Route::post('/password/forgot', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/logout', [AuthController::class, 'userLogout']);

    // reserve
    Route::get('/reserve/{reserve_id}', [ReserveController::class, 'getReserve'])->where('reserve_id', '[0-9]+');
    Route::get('/reserves', [ReserveController::class, 'getReserves']);
    Route::get('/reserves/count', [ReserveController::class, 'getReservesCount']);
    Route::post('/reserves', [ReserveController::class, 'createReserve']);
    Route::put('/reserve/{reserve_id}', [ReserveController::class, 'updateReserve'])->where('reserve_id', '[0-9]+');
    Route::put('/reserve/{reserve_id}/status', [ReserveController::class, 'updateReserveStatus'])->where('reserve_id', '[0-9]+');
    Route::delete('/reserve/{reserve_id}', [ReserveController::class, 'deleteReserve'])->where('reserve_id', '[0-9]+');

    // reserve_option
    Route::get('/reserves/options', [ReserveOptionController::class, 'getReserveOptions']);
    Route::get('/reserves/options/{reserve_option_id}', [ReserveOptionController::class, 'getReserveOption'])->where('reserve_option_id', '[0-9]+');
    Route::post('/reserves/options', [ReserveOptionController::class, 'createReserveOption']);
    Route::put('/reserves/options/{reserve_option_id}', [ReserveOptionController::class, 'updateReserveOption'])->where('reserve_option_id', '[0-9]+');
    Route::delete('/reserves/options/{reserve_option_id}', [ReserveOptionController::class, 'deleteReserveOption'])->where('reserve_option_id', '[0-9]+');

    // setting
    Route::get('/setting', [SettingController::class, 'getSetting']);
    Route::put('/setting', [SettingController::class, 'updateSetting']);
});

// アプリ用ルート
Route::middleware(['app.auth'])->group(function () {
    Route::prefix('/app/{uuid}')->where(['uuid' => '[a-zA-Z0-9_-]+'])->group(function () {
        // setting
        Route::get('/auth', [AppSettingController::class, 'getAppSettings']);

        // reserve
        Route::get('/reserves/dates', [AppReserveController::class, 'getReserveAvailableDates']);
        Route::get('/reserves/times', [AppReserveController::class, 'getReserveAvailableTimes']);
        Route::post('/reserves', [AppReserveController::class, 'createAppReserve']);
    });
});
