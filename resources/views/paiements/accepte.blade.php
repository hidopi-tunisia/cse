@extends('layout.app')

@section('content')
<div class="container mx-auto flex flex-col px-4 py-6 sm:px-6 sm:py-32 lg:divide-x lg:divide-gray-300 lg:flex-row xl:px-0">
    <div class="mx-auto max-w-2xl text-center">
        <h1 class="font-semibold uppercase text-base text-cse mb-3 md:text-xl">
            Paiement accepté
        </h1>
        <p class="text-lg">
            Votre paiement a été accepté.<br />
            Un mail récapitulatif de la commande vous a été envoyé.<br />
        </p>
    </div>
</div>
@endsection