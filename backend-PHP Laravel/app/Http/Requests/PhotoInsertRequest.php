<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotoInsertRequest extends MediasInsertRequest
{
    public function rules()
    {
        return parent::rules() + [
            'image' => 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }
}
