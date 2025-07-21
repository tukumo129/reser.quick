<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class ReserveOptionNotFoundException extends Exception
{
    protected $code;

    public function __construct(string $massage = 'Reserve Option not found.')
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
