<?php

namespace App\Http\Requests\Reserves;

use Illuminate\Foundation\Http\FormRequest;

class GetReserveOptionsRequest extends FormRequest
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
            'search_key' => ['string', 'nullable'],
            'sorts' => ['array', 'nullable'],
            'sorts.*' => ['string', 'nullable'],
            'page' => ['integer', 'nullable'],
            'limit' => ['integer', 'nullable'],
        ];
    }
}
