<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function voyage(Request $request)
    {
        $response = Http::withHeaders([
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post(env('MIX_APP_API_URL') . 'cse/voyage', $request->only('ref'));

        return response()->json(json_decode($response->body()));
    }

    public function searchQuote(Request $request)
    {
        $response = Http::withHeaders([
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post(env('MIX_APP_API_URL') . 'search-quote', $request->all());

        return response()->json(json_decode($response->body()));
    }

    public function commande(Request $request)
    {
        $response = Http::withHeaders([
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post(env('MIX_APP_API_URL') . 'commandes', $request->all());

        return response()->json(json_decode($response->body()));
    }

    public function rappel(Request $request)
    {
        $response = Http::withHeaders([
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post(env('MIX_APP_API_URL') . 'demande-de-rappel', $request->all());

        return response()->json(json_decode($response->body()));
    }
}
