<?php

namespace App\Http\Requests\Settings;

use App\Enums\DayOfWeek;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStoreSettingRequest extends FormRequest
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
            'setting.day_open_times' => ['array'],
            'setting.day_open_times.*.id' => ['integer'],
            'setting.day_open_times.*.date' => ['date', 'required_with:setting.day_open_times'],
            'setting.day_open_times.*.open_time' => ['string', 'required_with:setting.day_open_times'],
            'setting.day_open_times.*.close_time' => ['string', 'required_with:setting.day_open_times'],
            'setting.week_open_times' => ['array'],
            'setting.week_open_times.*.id' => ['integer'],
            'setting.week_open_times.*.week' => [Rule::in(DayOfWeek::getValues()), 'required_with:setting.week_open_times'],
            'setting.week_open_times.*.open_time' => ['string', 'required_with:setting.week_open_times'],
            'setting.week_open_times.*.close_time' => ['string', 'required_with:setting.week_open_times'],
        ];
    }
}
