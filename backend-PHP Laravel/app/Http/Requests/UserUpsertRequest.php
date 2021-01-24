<?php


namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpsertRequest extends FormRequest
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
        $request = request();

        // required if route parameter id is null
        $passwordValidation = Rule::requiredIf(
            is_null($request->route('id'))
        );

        // required if user type is employee
        $jobTitleValidation = Rule::requiredIf(function () use ($request){
            return $request->user_type_id == 2;
        });

        // email validation disabled for id that we are sending in route
        $emailValidation = Rule::unique('users');
        if($request->route('id')){
            $emailValidation->ignore($request->route('id'));
        }
        return [
            'first_name' => [
                'required'
            ],
            'last_name' => [
                'required'
            ],
            'email' => [
                'required',
                'email',
                $emailValidation
            ],
            'phone' => [
                'required',
            ],
            'address' => [
                'required',
            ],
            'password' => [
                $passwordValidation,
                'min:5',
                'max:50',
                'confirmed'
            ],
            'password_confirmation' => [
                $passwordValidation,
            ],
            'user_type_id' => [
                'required',
                'exists:user_types,id'
            ],
            'country_id'=>[
                'required',
                'exists:countries,id'
            ],
            'job_title'=>[
                $jobTitleValidation
            ],
            'image' => 'image:jpeg,png,jpg,gif,svg|max:2048'
        ];
    }
}
