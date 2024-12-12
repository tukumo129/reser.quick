<?php

namespace App\Http\Middleware;

use App\Exceptions\ContractNotFoundException;
use App\Repositories\ContractRepository;
use Closure;

class AppAuth
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function handle($request, Closure $next)
    {
        $uuid = $request->route('uuid');
        $contractRepository = resolve(ContractRepository::class);
        $contract = $contractRepository->findBy(['uuid' => $uuid])->first();
        if(!$contract) {
            throw new ContractNotFoundException("Contract not found uuid: {$uuid}.");
        }
        $request->attributes->set('contract', $contract);
        return $next($request);
    }
}
