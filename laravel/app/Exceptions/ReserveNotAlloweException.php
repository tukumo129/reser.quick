<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class ReserveNotAlloweException extends Exception
{
    protected $code;

    public function __construct($massage = 'Reserve Not id Allowe.')
    {
        parent::__construct($massage, Response::HTTP_BAD_REQUEST);
    }

    public function render()
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], $this->code);
    }
}
