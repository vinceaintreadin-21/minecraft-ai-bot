<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class AiController extends Controller
{
    public function handleMessage(Request $request)
    {
        $player = $request->input('player');
        $message = $request->input('message');

        $reply = "Hello $player, you said: $message";


        Message::create([
            'player_name' => $player,
            'message' => $message,
            'reply' => $reply,
        ]);

        return response()->json([
            'reply' => $reply
        ]);
    }
}
