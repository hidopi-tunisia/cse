<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaiementErreurController extends Controller
{
    public function __invoke()
    {
        return view('paiements.refuse');
    }
}
