<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoInsertRequest extends MediasInsertRequest
{
    public function rules()
    {
        return parent::rules() + [
            'url' => [
                'required',
                'url'
            ],
        ];
    }
}
