<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('accueil');
});

Route::get('/acheter-une-assurance', function () {
    if (request('ref')) {
        return view('reserver', ['ref' => request('ref')]);
    }

    return view('reserver');
});

Route::get('/a-propos', function () {
    return view('a-propos');
});

Route::get('/politique-de-confidentialite', function () {
    return view('politique-confidentialite');
});

Route::get('/faq', function () {
    return view('faq');
});

Route::get('/contactez-nous', function () {
    return view('contact');
});

Route::get('/mentions-legales', function () {
    return view('mentions');
});

Route::post('/voyage', [\App\Http\Controllers\ApiController::class, 'voyage']);
Route::post('/search-quote', [\App\Http\Controllers\ApiController::class, 'searchQuote']);
Route::post('/commandes', [\App\Http\Controllers\ApiController::class, 'commande']);
Route::post('/demande-de-rappel', [\App\Http\Controllers\ApiController::class, 'rappel']);
Route::get('/paiement-accepte', \App\Http\Controllers\PaiementAccepteController::class);
Route::get('/erreur-paiement', \App\Http\Controllers\PaiementErreurController::class);
Route::get('/paiement-accepte', \App\Http\Controllers\PaiementAccepteController::class);
Route::get('/paiement-refuse', \App\Http\Controllers\PaiementErreurController::class);
