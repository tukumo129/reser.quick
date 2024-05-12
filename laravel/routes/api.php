<?php

use App\Http\Controllers\Api\AuthController;
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
Route::post('/user/register', [AuthController::class, 'userRegister']);
Route::post('/user/login', [AuthController::class, 'userLogin']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/logout', [AuthController::class, 'userLogout']);

    // reserve
    Route::get('/reserve/{reserve_id}', [ReserveController::class, 'getReserve'])->where('reserve_id', '[0-9]+');
    Route::get('/reserves', [ReserveController::class, 'getReserves']);
    Route::post('/reserve', [ReserveController::class, 'createReserve']);
    Route::put('/reserve/{reserve_id}', [ReserveController::class, 'updateReserve'])->where('reserve_id', '[0-9]+');
    Route::delete('/reserve/{reserve_id}', [ReserveController::class, 'deleteReserve'])->where('reserve_id', '[0-9]+');
});
