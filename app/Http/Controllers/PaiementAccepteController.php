<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaiementAccepteController extends Controller
{
    public function __invoke()
    {
        return view('paiements.accepte');
    }
}
