<?php

namespace App\Http\Requests\Reserves;

use Illuminate\Foundation\Http\FormRequest;

class CreateReserveOptionRequest extends FormRequest
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
            'reserve_option' => ['array', 'required'],
            'reserve_option.name' => ['string', 'required'],
            'reserve_option.slot_time' => ['integer', 'required'],
            'reserve_option.price' => ['integer', 'required'],
        ];
    }
}
