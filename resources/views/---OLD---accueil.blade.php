@extends('layout.app')

@section('content')
<div class="w-full bg-cse">
    <div class="flex flex-col justify-between max-w-screen-xl mx-auto pb-6 px-4 md:flex-row md:py-10 md:space-x-12">
        <div class="flex flex-col w-full py-4 justify-evenly text-justify text-white md:w-3/5 lg:w-1/2">
            <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl">Seul, en couple, en famille ou entre amis, choisissez
                votre assurance en toute liberté.</h1>
            <p class="text-base xl:text-xl">Nous vous proposons des garanties négociées spécialement pour
                vous, avec le CSE LIGNES.<br /> Ces garanties sont les plus complètes et les plus compétitives du marché
                incluant en particulier des garanties COVID. </p>
        </div>
        <div class="bg-white rounded opacity-90 p-4 md:w-2/5">
            <p class="mb-8 text-lg text-center">
                <span class="text-cse text-2xl font-black lg:text-2xl xl:text-3xl">Assurance voyage</span><br>
                C'est avec l'esprit libre que l'on voyage.<br />
                Souscrivez en ligne pour vos prochaines vacances
            </p>
            <div class="py-2 text-xl text-center w-full">
                <div class="inline-block">
                    <a href="/acheter-une-assurance" class="text-white uppercase font-bold text-lg py-2.5 px-7 rounded-md bg-cse focus:outline-none md:px-5">
                        ACHETEZ EN LIGNE
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="bg-white">
    <div class="container flex flex-row items-stretch px-4 py-6 flex-wrap mx-auto text-gray-600 md:divide-x md:divide-gray-300 md:px-5 xl:py-9">
        <div class="flex flex-col justify-between w-full py-4 text-center sm:w-1/2 md:w-1/4 md:px-2">
            <div>
                <h3 class="text-xl font-black lg:text-3xl">3 Millions</h3>
                <p class="font-medium text-sm text-cse md:text-sm">De personnes assurées par an</p>
            </div>
            <img src="/images/ico_personnes.png" class="mx-auto" alt="3 millions personnes assurées par an" width="64" height="64" />
        </div>
        <div class="flex flex-col justify-between w-full py-4 text-center sm:w-1/2 md:w-1/4 md:px-2">
            <div>
                <h3 class="text-xl font-black lg:text-3xl">29&nbsp;000</h3>
                <p class="font-medium text-sm text-cse md:text-sm">Dossiers gérés par an</p>
            </div>
            <img src="/images/ico_dossiers.png" class="mx-auto" alt="29000 dossiers gérés par an" width="64" height="64" />
        </div>
        <div class="flex flex-col justify-between w-full py-4 text-center sm:w-1/2 md:w-1/4 md:px-2">
            <div>
                <h3 class="text-xl font-black lg:text-3xl">92%</h3>
                <p class="font-medium text-sm text-cse md:text-sm">Des dossiers ouverts sont indemnisés</p>
            </div>
            <img src="/images/ico_indemnises.png" class="mx-auto" alt="92% des dossiers ouverts sont indemnisés" width="64" height="64" />
        </div>
        <div class="flex flex-col justify-between w-full py-4 text-center sm:w-1/2 md:w-1/4 md:px-2">
            <div>
                <h3 class="text-xl font-black lg:text-3xl"><span class="timer" data-to="1680" data-speed="3000">1680</span></h3>
                <p class="font-medium text-sm text-cse md:text-sm">Personnes assistées à l’étranger en 2019</p>
            </div>
            <img src="/images/ico_assistees.png" class="mx-auto" alt="1680 personnes assistées à l’étranger en 2019" width="96" height="64" />
        </div>
    </div>
</section>
<section class="flex flex-col w-full bg-gray-700 text-white md:flex-row">
    <div class="flex-1 p-6 bg-gray-500 lg:p-12">
        <h3 class="text-xl font-bold">Nos Garanties</h3>
        <p class="mb-6">Annulation de voyage, Bagages, Assistance rapatriement, Interruption de séjour, Retour
            Impossible. Nos
            assurances incluent une <strong>garantie COVID.</strong></p>
        <h3 class="text-xl font-bold">Payez en Toute Sécurité</h3>
        <p>Notre système de paiement est assuré par Ingenico / leader mondial des solutions de paiement intégrées. </p>
    </div>
    <div class="flex-1 p-6 text-center lg:p-16">
        <h3 class="text-sm uppercase tracking-widest font-bold mb-2">CONTACTEZ PRESENCE ASSISTANCE</h3>
        Du lundi au vendredi de <strong>9h30 à 17h00</strong> au
        <span class="block text-3xl font-extrabold my-2 md:text-3xl">01&nbsp;55&nbsp;90&nbsp;47&nbsp;15</span>
        Une équipe de professionnels se tient à votre disposition pour tous renseignements complémentaires.
        <p>
            Vous souhaitez être rappelé, communiquez-nous votre numéro de téléphone, ainsi que la date et l’horaire à laquelle vous souhaitez être rappelé
        </p>
        <div id="cse-rappel" />
    </div>
</section>
@endsection