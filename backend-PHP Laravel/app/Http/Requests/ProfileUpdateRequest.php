<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
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
            'first_name' => [
                'required'
            ],
            'last_name' => [
                'required'
            ],
            'email' => [
                'required',
                'email'
            ],
            'user_type_id' => [
                'required',
                'exists:user_types,id'
            ],
            'country_id'=>[
                'required',
                'exists:countries,id'
            ],
            'image' => 'image:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }
}
