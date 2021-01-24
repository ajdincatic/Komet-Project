<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailService extends Mailable
{
    use Queueable, SerializesModels;

    public $randCode;

    public function __construct($randCode){
        $this->randCode = $randCode;
    }

    public function build(){
        return $this->subject('Reset password code: '. $this->randCode)
            ->view('email.reset_password');
    }
}
