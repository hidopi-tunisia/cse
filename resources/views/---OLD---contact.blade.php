@extends('layout.app')

@section('content')
<div class="container mx-auto flex flex-col px-4 py-6 sm:px-6 sm:py-16 lg:divide-x lg:divide-gray-300 lg:flex-row xl:px-0">
    <div class="flex-1 lg:px-6">
        <h2 class="font-semibold uppercase text-base text-cse mb-3 md:text-xl">
            Vous souhaitez des renseignements sur les garanties,
        </h2>
        <h3 class="font-bold text-gray-600 mb-2">Contactez nous</h3>
        <div class="border inline-block mb-6 text-sm text-gray-600 bg-white shadow-md border-gray-400 rounded-lg divide-y divide-gray-300 sm:text-base">
            <div class="p-3 rounded-t-lg">
                <span class="text-gray-900">Par téléphone</span> au <strong class="text-cse">01&nbsp;55&nbsp;90&nbsp;47&nbsp;15</strong> du
                lundi au vendredi
                de 9h30 à 17h00
            </div>
            <div class="p-3">
                <span class="text-gray-900">Par mail&nbsp;:</span> <strong class="text-cse">agentcelignes@presenceassistance.com</strong>
            </div>
        </div>
    </div>
    <div class="flex-1 lg:px-6">
        <h2 class="font-semibold uppercase text-base text-cse mb-3 md:text-xl">
            Vous souhaitez déclarer un sinistre
        </h2>
        <h3 class="font-bold text-gray-600 mb-2">Connectez vous au site</h3>
        <div class="border inline-block mb-6 bg-white shadow-md border-gray-400 rounded-lg p-3 text-cse text-sm sm:text-base">
            <strong>www.gestion.presenceassistance.com</strong>
        </div>

        <p class="mb-6 text-sm sm:text-base">Après vous être identifié grâce à votre numéro de dossier CSE LIGNES, et
            après avoir complété le
            formulaire de déclaration de sinistre, vous recevrez un mail vous indiquant les justificatifs à fournir.
            Vous
            pourrez télécharger vos justificatifs sur ce site et suivre en temps réel l’état d’avancement de votre
            dossier.
        </p>

        <p class="text-sm sm:text-base">Si vous rencontrez des difficulités, n’hésitez pas à nous contacter. Notre
            équipe dédiée est là pour vous aider&nbsp;!</p>
    </div>
</div>
@endsection