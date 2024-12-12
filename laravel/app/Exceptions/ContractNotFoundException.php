<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class ContractNotFoundException extends Exception
{
    protected $code;

    public function __construct(string $massage= "Contract not found.")
    {
        parent::__construct($massage, Response::HTTP_NOT_FOUND);
    }

    public function render()
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], $this->code);
    }
}
