<?php

namespace App\Http\Requests\App\Reserves;

use Illuminate\Foundation\Http\FormRequest;

class CreateAppReserveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'reserve' => ['array', 'required'],
            'reserve.name' => ['string', 'required'],
            'reserve.guest_number' => ['integer', 'required'],
            'reserve.start_date_time' => ['string', 'required'],
        ];
    }
}
