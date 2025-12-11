<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $msg = Message::create([
            'player_name' =>$request->player_name,
            'message' =>$request->message,
            'reply' =>$request->reply,
        ]);

        return response()->json([
            'success' => true,
            'data' => $msg
        ]);
    }

    public function index()
    {
        $msg = Message::all();

        return response()->json([
            'success' => true,
            'data' =>  $msg
        ]);
    }

    public function show($id)
    {
        $msg = Message::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $msg
        ]);
    }

    public function update(Request $request, $id)
    {
        $msg = Message::findOrFail($id);

        $msg->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $msg
        ]);
    }

    public function destroy($id)
    {
        return Message::destroy($id);
    }
}
