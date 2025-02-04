<?php

namespace App\Http\Requests\Settings;

use App\Enums\DayOfWeek;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSettingRequest extends FormRequest
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
            'setting.store_name' => ['string', 'required'],
            'setting.reserve_slot_time' => ['string', 'required'],
            'setting.max_reserve_number' => ['string', 'required'],
            'setting.reserve_months_limit' => ['string', 'required'],
            'setting.max_available_reserve' => ['integer', 'required'],
            'setting.open_times' => ['array'],
            'setting.open_times.*.id' => ['integer', 'required_with:setting.id', 'nullable'],
            'setting.open_times.*.type' => ['integer', 'required_with:setting.type'],
            'setting.open_times.*.date' => ['string', 'required_with:setting.date', 'nullable'],
            'setting.open_times.*.week' => [Rule::in(DayOfWeek::getValues()), 'required_with:setting.week', 'nullable'],
            'setting.open_times.*.start_time' => ['string', 'required_with:setting.start_time', 'nullable'],
            'setting.open_times.*.end_time' => ['string', 'required_with:setting.end_time', 'nullable'],
            'setting.open_times.*.max_available_reserve' => ['integer', 'required_with:setting.max_available_reserve', 'nullable'],
        ];
    }
}
