<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class ReserveNotFoundException extends Exception
{
    protected $code;

    public function __construct(int $reserveId)
    {
        $massage = "Reserve with id {$reserveId} not found.";
        parent::__construct($massage, Response::HTTP_NOT_FOUND);
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], $this->code);
    }
}
