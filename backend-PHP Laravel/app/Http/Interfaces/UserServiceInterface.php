<?php


namespace App\Http\Interfaces;


use App\Http\Requests\GoogleSignInRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpsertRequest;
use Illuminate\Http\Request;

interface  UserServiceInterface
{
    function getAll(Request $request);
    function getEmployees();
    function getRepresentative();
    function getById($id);
    function insert(UserUpsertRequest $request);
    function update($id, UserUpsertRequest $request);
    function delete($id);
    function login(UserLoginRequest $request);
    function googleLogin(GoogleSignInRequest $request);
    function resetPasswordSendEmail(Request $email);
    function resetPasswordCheckCode(Request $code);
    function resetPasswordSetNew(ResetPasswordRequest $request);
    function generateQRCode($id);
    function loginWithQRCode(Request $request);
}

