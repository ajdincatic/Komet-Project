<?php


namespace App\Http\Services;


use App\Helper\Generate;
use App\Http\Interfaces\UserServiceInterface;
use App\Http\Requests\GoogleSignInRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpsertRequest;
use App\Mail\MailService;
use App\Models\QRCodes;
use App\Models\Users;
use App\Models\UserTypes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\Mime\Encoder\Base64Encoder;

class UserService implements UserServiceInterface
{
    function getAll(Request $request)
    {
        $users = Users::with('country')->with('userType')->get();

        if($request->query->has('first_name')){
            $users = $users->where('first_name','=',$request->query->get('first_name'));
        }
        if($request->query->has('last_name')){
            $users = $users->where('last_name',$request->query->get('last_name'));
        }

        return response()->json($users,200);
    }

    function getEmployees()
    {
        $users = Users::where('user_type_id',UserTypes::where('type_name','Employee')->first()->id)->get();
        return response()->json($users,200);
    }

    function getRepresentative()
    {
        $users = Users::where('user_type_id',UserTypes::where('type_name','Representative')->first()->id)->get();
        return response()->json($users,200);
    }

    function getById($id)
    {
        $user = Users::where('id',$id)->first();
        return response()->json($user,200);
    }

    function insert(UserUpsertRequest $request)
    {
        $user = new Users();
        $user->password = Hash::make($request->password);
        $user->fill($request->all());
        $user->photo_path = "/storage/{$request->file('image')->store('img', 'public')}";
        $user->save();
        if(env('MAIL_HOST', 'nan') == 'smtp.mailtrap.io')
            $user->sendEmailVerificationNotification();
        return response()->json($user, 200);
    }

    function update($id, UserUpsertRequest $request)
    {
        $user = Users::where('id',$id)->first();
        $user->fill($request->all());
        if($request->photo_path)
            $user->photo_path = "/storage/{$request->file('image')->store('img', 'public')}";
        $user->save();
        return response()->json($user, 200);
    }

    function delete($id)
    {
        $user = Users::where('id',$id)->first();
        if($user)
            $user->delete();
        return response()->json($user, 200);
    }

    function login(UserLoginRequest $request)
    {
        if(!Auth::attempt($request->toArray())){
            return response(['massage'=>'Invalid login credentials.'],403);
        }
        $accessToken = Auth::user()->createToken('authToken')->accessToken;
        return response()->json(['user'=>Auth::user(), 'access_token'=>$accessToken], 200);
    }

    function resetPasswordSendEmail(Request $email){
        $user = Users::where('email',"=",$email->email)->first();
        if(!$user)
            return response()->json("Email not exsist.", 500);
        $randCode = substr(md5(uniqid(mt_rand(), true)) , 0, 8);
        $user->reset_password_code = $randCode;
        $user->save();
        \Mail::to($user->email)->send(new MailService($randCode));
        return response()->json("Mail sent to user.");
    }

    function resetPasswordCheckCode(Request $code){
        $user = Users::where('reset_password_code',"=",$code->code)->first();
        if(!$user)
            return response()->json("Code is wrong.", 500);
        $user->reset_password_code = null;
        $user->save();
        return response()->json($user);
    }

    function resetPasswordSetNew(ResetPasswordRequest $request){
        $user = Users::where('id',$request->user_id)->first();
        if(!$user)
            return response()->json("Error.", 500);
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json('Password changed.');
    }

    function generateQRCode($id)
    {
        $randString = base64_encode(Generate::generateRandomString(50)."user".$id);
        $qrCode = QrCode::size(300)->generate($randString);
        QRCodes::where('user_id',$id)->delete();
        $item = new QRCodes();
        $item->code = $randString;
        $item->user_id = $id;
        $item->save();
        var_dump($randString);
        return $qrCode;
    }

    function loginWithQRCode(Request $request)
    {
        $decoded = base64_decode($request->code);
        $splitedCode = explode('user', $decoded);
        $latestCode = QRCodes::where('user_id',$splitedCode[1])->latest()->first();
        if(!$latestCode OR ($latestCode->code != $request->code))
            return response()->json(['massage'=>'Wrong QR Code.'],403);

        Auth::loginUsingId($latestCode->user_id);
        $latestCode->delete();
        $accessToken = Auth::user()->createToken('authToken')->accessToken;
        return response()->json(['user'=>Auth::user(), 'access_token'=>$accessToken], 200);
    }

    function googleLogin(GoogleSignInRequest $request)
    {
        $user = Users::where('email',"=",$request->email)->first();
        if($user) {
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json(['user'=>$user, 'access_token'=>$accessToken], 200);
        }
        $user = new Users();
        $user->email = $request->email;
        $user->first_name = $request->givenName;
        $user->last_name = $request->familyName;
        $user->photo_path = $request->imageUrl;
        $user->google_id = $request->googleId;
        $user->user_type_id = UserTypes::where('type_name','=','User')->first()->id;
        $user->save();
        $accessToken = $user->createToken('authToken')->accessToken;

        return response()->json(['user'=>$user, 'access_token'=>$accessToken], 200);
    }
}
