import { client } from "./api-client";
import { format } from "date-fns";

const SITE_ID = process.env.MIX_SITE_ID;

/**
 * Récupère la liste des assurances
 * @param array params
 */
const assurances = async ({ projet }) => {
  const params = getParams({ projet });
  return await client("search-quote", "post", params);
};

/**
 * Récupérer le SHASIGN pour le paiement
 * @param array params
 */
const reservation = async ({
  coordonnees,
  accompagnants,
  projet,
  assurance,
}) => {
  const params = getParams({ coordonnees, accompagnants, projet, assurance });
  return await client("commandes", "post", params);
};

/**
 * Créer l'objet params pour les requêtes
 * @param {*} param0
 * @returns
 */
const getParams = ({
  coordonnees,
  accompagnants,
  projet,
  assurance,
  transport,
  source,
}) => {
  let params = {
    prix_voyage: parseInt(parseFloat(projet.montant) * 100, 10),
    date_depart: format(projet.dates.from, "yyyy-MM-dd"),
    date_retour: format(projet.dates.to, "yyyy-MM-dd"),
    code_pays_destination: projet.destination.iso,
    nombre_accompagnants: parseInt(projet.voyageurs.accompagnants, 10),
    transport,
    source,
  };

  if (coordonnees !== undefined) {
    params.voyageur = {
      numero: coordonnees.numero,
      civilite: coordonnees.civilite,
      nom: coordonnees.nom,
      prenom: coordonnees.prenom,
      date_naissance: format(coordonnees.dateNaissance, "yyyy-MM-dd"),
      telephone: `+${coordonnees.prefixe.prefix}${coordonnees.telephone}`,
      email: coordonnees.email,
      email_confirmation: coordonnees.emailConfirm,
      cp: coordonnees.codePostal,
      ville: coordonnees.ville,
      adresse: coordonnees.adresse,
      adresse2: coordonnees.adresse2,
      pays: coordonnees.pays.iso,
    };
  }

  if (accompagnants !== undefined) {
    let items = [];

    for (let i = 0; i < accompagnants.length; i++) {
      items.push({
        nom: accompagnants[i].nom,
        prenom: accompagnants[i].prenom,
        date_naissance: format(accompagnants[i].dateNaissance, "yyyy-MM-dd"),
      });
    }

    params.accompagnants = items;
  }

  if (assurance !== undefined) {
    params.assurance = {
      id: assurance.ref,
      priceline: assurance.priceline,
      prix: assurance.prix,
      nom: assurance.nom,
    };
  }

  params.site_id = SITE_ID;

  return params;
};

export { assurances, reservation };
