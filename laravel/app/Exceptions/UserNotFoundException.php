<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class UserNotFoundException extends Exception
{
    protected $code;

    public function __construct(int $userId)
    {
        $massage = "User with id {$userId} not found.";
        parent::__construct($massage, Response::HTTP_NOT_FOUND);
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], $this->code);
    }
}
