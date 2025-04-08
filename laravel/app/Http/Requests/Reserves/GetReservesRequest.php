<?php

namespace App\Http\Requests\Reserves;

use Illuminate\Foundation\Http\FormRequest;

class GetReservesRequest extends FormRequest
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
            'criteria' => ['array', 'nullable'],
            'criteria.status' => ['string', 'nullable'],
            'period_criteria' => ['array', 'nullable'],
            'period_criteria.start_date_time' => ['string', 'nullable', 'required_with:period_criteria.end_data_time'],
            'period_criteria.end_date_time' => ['string', 'nullable', 'required_with:period_criteria.start_data_time'],
            'search_key' => ['string', 'nullable'],
            'sorts' => ['array', 'nullable'],
            'sorts.*' => ['string', 'nullable'],
            'page' => ['integer', 'nullable'],
            'limit' => ['integer', 'nullable'],
        ];
    }
}
