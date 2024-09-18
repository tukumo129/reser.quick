<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReserveSettingRequest extends FormRequest
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
            'setting' => ['array', 'required'],
            'setting.max_concurrent_reserve' => ['integer', 'nullable'],
            'setting.reserve_slot_time' => ['string', 'required'],
            'setting.default_stay_time' => ['string', 'required'],
            'setting.max_reserve_number' => ['integer', 'nullable'],
            'setting.reserve_months_limit' => ['integer', 'nullable'],
        ];
    }
}
