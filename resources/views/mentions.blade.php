@extends('layout.app')

@section('content')
<div class="boxed mx-auto px-4 py-6 sm:px-6 sm:py-9 xl:px-0">
    <h1 class="main-title">MENTIONS LEGALES</h1>
    <div class="relative flex flex-col-reverse items-start lg:flex-row">
        <div class="flex-1 py-6 text-sm sm:text-base sm:px-6">
            <h2 id="p1" class="font-lg font-semibold text-red-800">INFORMATIONS GENERALES</h2>
            <p class="pb-6 md:leading-loose md:text-justify">
                Le site «&nbsp;cselignes.presenceassistance.fr&nbsp;» est édité par la société
                PRESENCE ASSISTANCE TOURISME
                Société de Courtage d'assurances SAS au capital de 1.118.880€
                Siège social&nbsp;: 55 bis rue Edouard Vaillant 92300 LEVALLOIS PERRET
                Numéro de RCS (SIREN)&nbsp;: 622 035 947
            </p>
            <p class="pb-6 md:leading-loose md:text-justify">
                Le directeur de la publication est M. Arnaud Visbecq Directeur Général.
            </p>
            <h2 id="p2" class="font-lg font-semibold text-red-800">AUTORITE DE CONTROLE</h2>
            <p class="pb-6 md:leading-loose md:text-justify">
                L'autorité chargée du contrôle est l'Autorité de Contrôle Prudentiel et de Résolution – A.C.P.R. 4,
                place de Budapest – CS 92459 – 75436 PARIS Cédex 9.
            </p>
            <h2 id="p3" class="font-lg font-semibold text-red-800">HEBERGEUR</h2>
            <p class="pb-6 md:leading-loose md:text-justify">
                Le fournisseur de l'hébergement est la société o2switch<br />
                222-224 Boulevard Gustave Flaubert<br />
                63000 Clermont-Ferrand
            </p>
            <h2 id="p4" class="font-lg font-semibold text-red-800">CONDITIONS D'UTILISATION DU SITE
                cselignes.presenceassistance.fr</h2>
            <h3 class="font-semibold text-red-700">Propriété</h3>
            <p class="pb-6 md:leading-loose md:text-justify">
                Le site et son contenu font l'objet d'une protection légale au titre de la propriété littéraire et
                artistique et de la propriété industrielle.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Il est interdit à tout internaute de copier ou reproduire
                tout ou partie du contenu du site, sauf pour son usage propre et sauf autorisation spécifique.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Tous droits réservés.
            </p>
            <h3 class="font-semibold text-red-700">Validité des Informations</h3>
            <p class="pb-6 md:leading-loose md:text-justify">
                PRESENCE Assistance Tourisme ne pourra être tenue pour responsable des conséquences directes ou
                indirectes pouvant résulter de l'utilisation, la consultation et l'interprétation des informations
                fournies, ni de la modification des dispositions administratives et juridiques survenant après la
                publication.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Le contenu des offres commerciales peut être modifié par
                PRESENCE Assistance Tourisme sans préavis.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Tout lien depuis un site internet extérieur vers le site
                cselignes.presenceassistance.fr doit faire l'objet d'une autorisation préalable de PRESENCE Assistance
                Tourisme.
            </p>
            <h3 class="font-semibold text-red-700">Champ d'application</h3>
            <p class="pb-6 md:leading-loose md:text-justify">
                La conclusion d'une commande via le site cselignes.presenceassistance.fr engendre un contrat valide
                entre le client ou la cliente et la compagnie d'assurance à laquelle s'appliquent les conditions
                générales et particulières de vente.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Les dispositions relatives à chaque offre figurent dans les
                descriptions de produits et prestations contenues dans le site internet. Lors de chaque adhésion, vous
                devez valider que vous avez lu, compris et accepté l'ensemble des conditions générales du contrat
                (définition, montants et limites de garanties, exclusions, procédures en cas de sinistre).</p>
            <p class="pb-6 md:leading-loose md:text-justify">Seules les personnes âgées de plus 18 ans ou plus peuvent
                adhérer au contrat d'assurances sur le site cselignes.presenceassistance.fr
            </p>
            <h2 id="p6" class="font-lg font-semibold text-red-800">DELAI DE RENONCIATION</h2>
            <h3 class="font-semibold text-red-700">Vente à distance</h3>
            <p class="pb-6 md:leading-loose md:text-justify">
                Dans le cadre de la vente à distance et si la durée du contrat est supérieure à 1 mois, l'article
                L112-2-1 du Code des Assurances, prévoit l'existence d'un droit de renonciation de 14 jours sans que le
                souscripteur ait à fournir un quelconque justificatif. Lorsque ce droit s'applique, il convient
                d'adresser à PRESENCE Assistance Tourisme un courrier recommandé avec accusé de réception pour demander
                le remboursement de votre contrat. Il conviendra de mentionner la date de l'achat, le numéro du contrat
                et le montant de la prime réglée. Ce droit à renonciation sans justification n'est pas valable pour une
                durée d'assurance égale ou inférieure à 1 mois.
            </p>
            <h3 class="font-semibold text-red-700">Droit à renonciation en cas d'assurance multiple</h3>
            <p class="pb-6 md:leading-loose md:text-justify">
                Vous êtes invité à vérifier que vous n'êtes pas déjà bénéficiaire d'une garantie couvrant l'un des
                risques garantis par le nouveau contrat. Si tel est le cas, vous bénéficiez d'un droit de renonciation à
                ce contrat pendant un délai de quatorze jours (calendaires) à compter de sa conclusion, sans frais ni
                pénalités, si toutes les conditions suivantes sont remplies&nbsp;:<br />
                <span class="puce">•&nbsp;</span>Vous avez souscrit ce contrat à des fins
                non professionnelles<br />
                <span class="puce">•&nbsp;</span>Ce contrat vient en complément de l'achat
                d'un bien ou d'un service vendu par un fournisseur<br />
                <span class="puce">•&nbsp;</span>Vous justifiez que vous êtes déjà couvert
                pour l'un des risques garantis par ce nouveau contrat<br />
                <span class="puce">•&nbsp;</span>Le contrat auquel vous souhaitez renoncer
                n'est pas intégralement exécuté<br />
                <span class="puce">•&nbsp;</span>Vous n'avez déclaré aucun sinistre
                garanti par ce contrat<br />
                Dans cette situation, vous pouvez exercer votre droit à renoncer à ce contrat par lettre ou tout autre
                support durable adressé à l'assureur du nouveau contrat, accompagné d'un document justifiant que vous
                bénéficiez déjà d'une garantie pour l'un des risques garantis par le nouveau contrat. PRESENCE
                Assistance Tourisme est tenu de vous rembourser la prime payée, dans un délai de 30 jours à compter de
                votre renonciation.
            </p>
            <h2 id="p7" class="font-lg font-semibold text-red-800">ANNULATION OU MODIFICATION DES ADHESIONS D'ASSURANCE</h2>
            <p class="pb-6 md:leading-loose md:text-justify">
                Vous souhaitez modifier des informations figurant au contrat, du type&nbsp;: Nom de l'assuré, Dates du
                voyage, Destination, Type de contrat
            <p class="pb-6 md:leading-loose md:text-justify">Vous devez contacter par téléphone ou par mail PRESENCE
                Assistance Tourisme avant la date de départ et dès que vous avez connaissance de la modification à
                apporter.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Certaines modifications peuvent entraîner une augmentation
                de la prime à régler. Ce règlement devra avoir lieu avant la prise d'effet du contrat pour que la
                modification soit acquise.</p>
            <p class="pb-6 md:leading-loose md:text-justify">Aucune modification du contrat ne pourra avoir lieu après
                la date de départ.</p>
            <p class="pb-6 md:leading-loose md:text-justify">La prime d'assurance n'est pas remboursable même si vous ne
                souhaitez plus effectuer le voyage. Toutefois si l'organisateur du voyage se voit dans l'obligation
                d'annuler la commande assurée par le contrat souscrit auprès de PRESENCE Assistance Tourisme, et qu'il
                n'est pas en mesure de vous proposer un voyage qui puisse correspondre à vos envies, nous vous
                rembourserons l'assurance souscrite sous 15 jours maximum à partir du moment où vous nous aurez fourni
                le justificatif de l'annulation du voyage par l'organisateur. </p>
            </p>
            <h2 id="p8" class="font-lg font-semibold text-red-800">RECLAMATION</h2>
            <p class="pb-6 md:leading-loose md:text-justify">
                En cas de réclamation concernant un contrat souscrit, vous pouvez vous adresser à PRESENCE Assistance
                Tourisme – Service Réclamation – 55 bis rue Edouard Vaillant 92300 LEVALLOIS PERRET ou par mail à
                reclamation@presenceassistance.com <br />
                Nous accuserons réception sous 48 heures ouvrés et reviendrons vers vous après étude de votre
                réclamation dans un délai maximum de 8 semaines.<br />
                Si la réponse ne vous satisfait pas, vous pourrez vous adresser au service réclamation de la compagnie
                d'assurance dont les coordonnées figurent sur le contrat transmis au moment de la souscription.
            </p>
        </div>
        <div class="relative flex-none w-full text-sm sm:px-4 lg:py-6 lg:sticky lg:w-72 lg:top-14">
            <ul class="divide-y divide-gray-300 md:divide-y-0">
                <li><a href="#p1" class="menu-mentions">Informations
                        Générales</a></li>
                <li><a href="#p2" class="menu-mentions">Autorité de contrôle</a></li>
                <li><a href="#p3" class="menu-mentions">Hébergeur</a> </li>
                <li><a href="#p4" class="menu-mentions">Conditions d'utilisation du site cselignes.presenceassistance.fr</a></li>
                <li><a href="#p6" class="menu-mentions">Délai de renonciation</a></li>
                <li><a href="#p7" class="menu-mentions">Annulation ou modification des adhésions d'assurance</a></li>
                <li><a href="#p8" class="menu-mentions">Réclamation</a> </li>
            </ul>
        </div>
    </div>
</div>
@endsection