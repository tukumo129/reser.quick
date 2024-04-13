<?php

use App\Http\Controllers\Api\ReserveController;
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
/**
 * 予約関係の処理完成、次はユーザー関係の方を作りこむ
 */
Route::middleware(['auth'])->group(function () {
    // reserve
    Route::get('/admin/reserve/{reserve_id}', [ReserveController::class, 'getReserve'])->where('reserve_id', '[0-9]+');
    Route::get('/admin/reserves', [ReserveController::class, 'getReserves']);
    Route::post('/admin/reserve', [ReserveController::class, 'createReserve']);
    Route::put('/admin/reserve/{reserve_id}', [ReserveController::class, 'updateReserve'])->where('reserve_id', '[0-9]+');
    Route::delete('/admin/reserve/{reserve_id}', [ReserveController::class, 'deleteReserve'])->where('reserve_id', '[0-9]+');
});
