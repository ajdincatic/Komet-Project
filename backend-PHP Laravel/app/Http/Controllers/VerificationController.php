<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    use VerifiesEmails;

    public function verify(Request $request) {
        auth()->loginUsingId($request->route('id'));

        if($request->route('id') != $request->user()->getKey()){
            throw new AuthenticationException;
        }

        if($request->user()->hasVerifiedEmail()){
            return response(['message'=>'Already verified.']);
        }

        if($request->user()->markEmailAsVerified()){
            event(new Verified($request->user()));
        }

        return response(['message'=>'Successfully verified.']);
    }

    public function resend(Request $request) {
        if($request->user()->hasVerifiedEmail()){
            return response(['message'=>'Already verified.']);
        }

        $request->user()->sendEmailVerificationNotification();

        if($request->wantsJson()){
            return response(['message'=>'Email Sent.']);
        }

        return back()->with('resent', true);
    }
}
