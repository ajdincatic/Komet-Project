<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\UserServiceInterface;
use App\Http\Requests\GoogleSignInRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpsertRequest;
use App\Models\Countries;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UsersController extends Controller
{
    private $service;
    public function __construct(UserServiceInterface $service)
    {
        $this->service = $service;
    }

    function getAll(Request $request){
        return $this->service->getAll($request);
    }

    function getEmployees(){
        return $this->service->getEmployees();
    }

    function getRepresentative(){
        return $this->service->getRepresentative();
    }

    function getById($id){
        return $this->service->getById($id);
    }

    function insert(UserUpsertRequest $request){
        return $this->service->insert($request);
    }

    function update($id, UserUpsertRequest $request){
        return $this->service->update($id,$request);
    }

    function delete($id){
        return $this->service->delete($id);
    }

    function login(UserLoginRequest $request){
        return $this->service->login($request);
    }

    function googleLogin(GoogleSignInRequest $request){
        return $this->service->googleLogin($request);
    }

    function resetPasswordSendEmail(Request $email){
        return $this->service->resetPasswordSendEmail($email);
    }

    function resetPasswordCheckCode(Request $code){
        return $this->service->resetPasswordCheckCode($code);
    }

    function resetPasswordSetNew(ResetPasswordRequest $request){
        return $this->service->resetPasswordSetNew($request);
    }


    function generateQRCode($id){
        return $this->service->generateQRCode($id);
    }

    function loginWithQRCode(Request $request){
        return $this->service->loginWithQRCode($request);
    }
}
