<?php

namespace App\Http\Requests\Reserves;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReserveRequest extends FormRequest
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
            'reserve.contract_id' => ['integer', 'required'],
            'reserve.name' => ['string', 'required'],
            'reserve.guest_number' => ['integer', 'required'],
            'reserve.start_date_time' => ['string', 'required'],
            'reserve.end_date_time' => ['string', 'required'],
            'reserve.uuid' => ['string', 'required'],
        ];
    }
}
