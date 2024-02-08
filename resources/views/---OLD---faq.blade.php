@extends('layout.app') @section('content') <div x-data="{faqActive: ''}"
     class="container mx-auto px-4 py-6 z-40 sm:px-6 sm:py-16 xl:px-0">
    <h1 class="main-title">Foire aux questions</h1>
    <div class="relative flex flex-col items-start lg:flex-row">
        <div class="relative flex-none w-full text-sm mb-9 sm:px-4 lg:sticky lg:w-72 lg:top-14">
            <ul class="divide-y divide-gray-300 md:divide-y-0">
                <li class="text-cse font-semibold border-l-4 border-gray-300 pl-2">QUESTIONS «&nbsp;SPECIALES
                    COVID&nbsp;»</li>
                <li><a @click="faqActive = 'q1'"
                       href="#"
                       class="menu-mentions">Avant le départ</a></li>
                <li><a @click="faqActive = 'q2'"
                       href="#"
                       class="menu-mentions">Pendant le voyage</a></li>
                <li class="text-cse font-semibold border-l-4 border-gray-300 pl-2 mt-3">QUESTIONS GENERALES</li>
                <li><a @click="faqActive = 'q3'"
                       href="#"
                       class="menu-mentions">Annulation de voyage</a></li>
                <li><a @click="faqActive = 'q4'"
                       href="#"
                       class="menu-mentions">Interruption de séjour</a></li>
                <li><a @click="faqActive = 'q5'"
                       href="#"
                       class="menu-mentions">Bagages</a></li>
                <li><a @click="faqActive = 'q6'"
                       href="#"
                       class="menu-mentions">Retour impossible</a></li>
            </ul>
        </div>
        <div class="flex-1 sm:px-6">
            {{-- <h2 class="font-light text-base text-gray-700 sm:text-xl md:text-2xl">QUESTIONS «&nbsp;SPECIALES COVID&nbsp;»</h2> --}}
            <div :class="{'hidden': faqActive !== 'q1', 'block': faqActive === 'q1'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q1">AVANT LE DEPART</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Est-ce que je suis
                        garanti si je suis déclaré « Cas contact » avant le départ et que je ne peux pas partir&nbsp;?
                    </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> le contrat Multirisques
                        7292 qui vous est proposé vous garanti si vous êtes déclaré «&nbsp;Cas contact&nbsp;» dans les
                        14 jours qui précèdent le départ et que vous détenez un justificatif émanant de l’ARS ou de la
                        CPAM. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Est-ce que je suis
                        garanti si j’ai un test PCR positif&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui, en cas de test PCR
                        positif dans les jours qui précèdent votre départ et vous empêchant de prendre le moyen de
                        transport prévu. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Je suis malade du
                        COVID, et je ne peux pas voyager. Est-ce que je vais être remboursé&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui si la maladie s’est
                        déclarée dans le mois qui précède le départ, nous vous rembourserons le montant des frais
                        d’annulation retenus par l’organisateur du voyage. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Nous avons réservé
                        une croisière pour la Pentecôte et nous avons souscrit l’assurance. Nous devons partir dans 15
                        jours mais le pays que nous devions visiter vient de modifier ses conditions d’entrée et impose
                        que nous soyons vaccinés. Je n’ai plus le temps de prendre rendez-vous et de faire les deux
                        injections nécessaires avant le départ. Est-ce que nous pouvons obtenir un remboursement du
                        montant des frais d’annulation&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui car au moment de
                        l’achat de l’assurance, le pays de destination n’imposait pas de vaccin et cette condition
                        n’était pas connue. Nous vous rembourserons le montant des frais d’annulation retenus par
                        l’organisateur du voyage. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Est-ce que cette
                        assurance rembourse le montant du voyage si les frontières ferment avant le départ&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> En cas de fermeture des
                        frontières, les conditions du voyage que vous avez acheté ne pouvant être honorées par le
                        prestataire, c’est donc lui qui vous rembourse le voyage et non pas l’assurance. Le contrat
                        d’assurance dans ce cas est remboursable ou il peut également être reporté sur un autre voyage
                        si vous le souhaitez. </div>
                </div>
            </div>
            <div :class="{'hidden': faqActive !== 'q2', 'block': faqActive === 'q2'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q2">PENDANT LE VOYAGE</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Je suis tombée
                        malade du COVID pendant mon séjour. Que dois-je faire&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Vous devez
                        impérativement contacter le service d’assistance ouvert 24h/24 et 7j/7 par téléphone + 33 1 55
                        98 71 76 ou par mail medical@mutuaide.fr. Un numéro de dossier vous sera communiqué. Le médecin
                        de la compagnie prendra contact avec le médecin sur place afin d’organiser au mieux votre prise
                        en charge et votre retour lorsque votre état de santé le permettra. Les frais d’hospitalisation
                        sur place sont pris en charge par le contrat. Si votre billet d’avion n’est pas modifiable ou
                        remboursable, un nouveau titre de transport vous sera fourni. Pour les membres de votre famille
                        vous accompagnants et non malades, une prise en charge de frais hôteliers pourra avoir lieu si
                        le retour doit se faire après la date de retour prévue. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Je dois faire un
                        test PCR sur place avant de rentrer en France. Qui prend en charge les frais de ce test&nbsp;?
                    </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Si le test PCR que vous
                        êtes obligé de faire sur place s’avère positif, il sera pris en charge par la compagnie
                        d’assurance. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Je viens d’être mis
                        en quarantaine sur place et je ne pourrai utiliser mon vol de retour prévu. Je dois rester dans
                        un hôtel pendant 5 jours de plus. Est-ce que vous prenez ces frais en charge&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui votre contrat
                        prévoit la prise en charge de 100€ par personne et par nuit pour les nuits d’hôtel
                        supplémentaires</div>
                </div>
            </div>
            {{-- <h2 class="font-light text-xl text-gray-700 sm:text-xl md:text-2xl">QUESTIONS GENERALES</h2> --}} <div
                 :class="{'hidden': faqActive !== 'q3', 'block': faqActive === 'q3'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q3">ANNULATION DE VOYAGE</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Je souhaite être
                        remboursé si mon fils tombe malade avant le début de sa colonie et qu’il ne peut pas y
                        participer. Quel contrat choisir&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> le contrat Multirisques
                        7292 garantit l’annulation de voyage avant le départ, en cas problème médical du participant ou
                        d’un membre de sa famille. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> L’organisme de
                        voyage qui organise le voyage de ma fille pour cet été vient de m’informer que le voyage est
                        annulé. Est-ce que vous me remboursez l’assurance que j’avais souscrite&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui, lorsque
                        l’annulation du voyage est du fait de l’organisateur, nous vous remboursons immédiatement
                        l’assurance. Il vous suffit de nous adresser par mail à agentcelignes@presenceassistance.com le
                        justificatif de l’organisateur confirmant l’annulation du voyage et la facture du voyage
                        comportant le numéro de commande pour nous permettre de retrouver rapidement la souscription de
                        l’assurance. Sous 72 h ouvrées, nous recréditerons la carte bancaire ayant servi à régler le
                        contrat d’assurance à l’origine. </div>
                </div>
            </div>
            <div :class="{'hidden': faqActive !== 'q4', 'block': faqActive === 'q4'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q4">INTERRUPTION DE SEJOUR</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> La compagnie
                        d’assistance m’a rapatrié suite à un accident pendant mon voyage. Je suis rentrée 5 jours avant
                        la date de retour prévue et j’ai donc perdu des nuits d’hôtel. Est-ce que je peux être
                        remboursé&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui, votre contrat
                        prévoit le remboursement des prestations terrestres non utilisées (au prorata temporis) en cas
                        de retour anticipé ou de rapatriement organisé par la compagnie. Vous devez Impérativement
                        contacter le plateau d’assistance au + 33 1 55 98 71 76 AVANT de rentrer. Vous ne pourrez
                        prétendre à aucun remboursement si vous n’avez pas contacté la compagnie et ouvert un dossier.
                    </div>
                </div>
            </div>
            <div :class="{'hidden': faqActive !== 'q5', 'block': faqActive === 'q5'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q5">BAGAGES</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> je me suis fait
                        voler mon sac à l’arraché pendant mon séjour. Est-ce que je peux me faire rembourser&nbsp;?
                    </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Votre contrat prévoit
                        une indemnisation en cas de vol à l’arraché. Il est impératif de faire établir une déclaration
                        de vol auprès des autorités compétentes du pays, décrivant les circonstances du vol. La liste
                        des objets volés ainsi que les factures d’achat devront être fourni pour pouvoir prétendre à une
                        indemnisation. </div>
                </div>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Mon bagage n’était
                        pas à l’aéroport à l’arrivée sur mon vol aller. Mon bagage a été livré 48 heures plus tard. J’ai
                        dû racheter des effets de première nécessité. Est-ce que je peux être remboursé&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Vous pouvez déclarer un
                        sinistre par l’intermédiaire du site www.gestion.presenceassistance.com. Vous devrez fournir les
                        preuves d’achat des effets achetés, ainsi que la preuve de la date de remise du bagage égaré.
                        Une indemnisation vous sera accordée avec un plafond de 150€ par personne. </div>
                </div>
            </div>
            <div :class="{'hidden': faqActive !== 'q6', 'block': faqActive === 'q6'}"
                 x-cloak>
                <h3 class="font-bold text-cse"
                    id="q6">RETOUR IMPOSSIBLE</h3>
                <div class="faq-card">
                    <div class="faq-q"> <strong class="font-bold text-cse">Question&nbsp;:</strong> Suite à une tempête
                        de neige, l’aéroport de Toronto a été fermé et je n’ai pas pu prendre mon vol retour sur Paris
                        avant 3 jours. J’ai dû payer des nuits d’hôtel. Est-ce que je peux être remboursé&nbsp;? </div>
                    <div class="p-3"> <strong class="font-bold text-cse">Réponse&nbsp;:</strong> Oui le contrat 7292
                        Multirisques prévoit la prise en charge des frais hôteliers à partir de la deuxième nuit à
                        hauteur de 100 € par personne. </div>
                </div>
            </div>
        </div>
    </div>
</div> @endsection