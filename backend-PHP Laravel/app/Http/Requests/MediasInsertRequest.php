<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MediasInsertRequest extends FormRequest
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
        Validator::extend('exists_soft',
            function($attribute, $value, $parameters)
            {
                if (!isset($parameters[0])) {
                    throw new Exception('Validator "exists_soft" missing tablename.');
                }
                $tableName = $parameters[0];
                $columnName = isset($parameters[1])?$parameters[1]:null;
                $validator = Validator::make([$attribute => $value],
                    [
                        $attribute => [
                            Rule::exists($tableName, $columnName)
                                ->where(function ($query) {
                                    $query->whereNull('deleted_at');
                                }),
                        ]
                    ]);
                return $validator->passes();
            });

        return [
            'title' => [
                'required'
            ],
            'category_id' => [
                'required',
                'exists_soft:media_categories,id',
            ]
        ];
    }
}
