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
            'setting.reserve_slot_time' => ['integer', 'nullable'],
            'setting.max_reserve_number' => ['integer'],
            'setting.reserve_months_limit' => ['integer'],
            'setting.reserve_block_minutes' => ['integer'],
            'setting.max_available_reserve' => ['integer', 'nullable'],
            'setting.open_times' => ['array'],
            'setting.open_times.*.id' => ['integer', 'nullable'],
            'setting.open_times.*.type' => ['integer', 'required_with:setting.type'],
            'setting.open_times.*.date' => ['string', 'nullable'],
            'setting.open_times.*.week' => [Rule::in(DayOfWeek::getValues()), 'nullable'],
            'setting.open_times.*.start_time' => ['string', 'nullable'],
            'setting.open_times.*.end_time' => ['string', 'nullable'],
            'setting.open_times.*.max_available_reserve' => ['integer', 'nullable'],
        ];
    }
}
