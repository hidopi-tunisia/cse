import React from "react";
import { format } from "date-fns";
import { useDeepCompareEffect } from "react-use";

import { reservation } from "../../../api/reservation-client";

const URL_PAIEMENT = process.env.MIX_MONETICO_URL;
const TPE = process.env.MIX_MONETICO_TPE;
const CODE_SITE = process.env.MIX_MONETICO_SITE;

const Recapitulatif = ({ coordonnees, accompagnants, projet, assurance }) => {
  let [state, setState] = React.useState({
    loading: true,
    error: false,
    hash: null,
    contexte: null,
    dateCommande: null,
    id: null,
    url: null,
    optin: false,
    orderid: null,
  });

  useDeepCompareEffect(() => {
    const fetchData = async () => {
      const res = await reservation({
        coordonnees,
        accompagnants,
        projet,
        assurance,
      });
      if (res.success === true && res.body.mac) {
        setState({
          ...state,
          hash: res.body.mac,
          contexte: res.body.contexte,
          orderid: res.body.id,
          url: res.body.url,
          dateCommande: res.body.date,
          montant: res.body.montant,
          error: false,
          loading: false,
        });
      } else {
        setState({
          ...state,
          hash: null,
          contexte: null,
          orderid: null,
          url: null,
          dateCommande: null,
          montant: null,
          error: true,
          loading: false,
        });
      }
    };

    fetchData();
  }, [coordonnees, accompagnants, projet, assurance]);

  const onOptinChange = (ev) => {
    setState({ ...state, optin: ev.target.checked });
  };

  if (accompagnants.length > 0) {
    part = "partent";
    for (let i = 0; i < accompagnants.length - 1; i++) {
      noms = `${noms}, ${accompagnants[i].prenom}`;
    }

    noms = `${noms} et ${accompagnants[accompagnants.length - 1].prenom}`;
  }

  if (state.loading === true) {
    return (
      <div className="py-24 text-center text-lg">Veuillez patienter...</div>
    );
  }

  if (state.error === true) {
    return <div className="py-24 text-center text-lg">Erreur</div>;
  }

  return (
    <div className="resa-container text-center">
      <h1 className="resa-title">Récapitulatif de votre demande</h1>
      <div className="text-xl mb-10 leading-loose">
        Vous partez en voyage du{" "}
        <span className="text-cse">
          {format(projet.dates.from, "dd/MM/yyyy")}
        </span>{" "}
        au{" "}
        <span className="text-cse">
          {format(projet.dates.to, "dd/MM/yyyy")}
        </span>
        .<br />
        Presence Assistance tourisme vous couvrira avec la formule{" "}
        <span className="text-cse">{assurance.nom}</span>
        .<br />
        Après l'étape de paiement de{" "}
        <span className="text-cse">{assurance.prix_eur}</span> par carte
        bancaire,
        <br />
        Vous recevrez immédiatement le contrat par mail.
      </div>
      <div className="text-base">
        <input
          onChange={onOptinChange}
          id="optin"
          name="optin"
          type="checkbox"
          className="h-4 w-4 mr-2 text-cse border-gray-300 rounded cursor-pointer focus:ring-red-200"
        />
        <label htmlFor="optin">
          Je reconnais avoir pris connaissance des{" "}
          <a
            className="text-blue-400 hover:text-blue-600"
            href={assurance.cgv}
            target="_blank"
          >
            conditions générales
          </a>{" "}
          et spéciales et je les accepte.
        </label>
      </div>
      <div className="py-6 text-center">
        <form method="post" name="Monetico" target="_top" action={URL_PAIEMENT}>
          <input type="hidden" name="version" value="3.0" />
          <input type="hidden" name="TPE" value={TPE} />
          <input type="hidden" name="date" value={state.dateCommande} />
          <input type="hidden" name="montant" value={state.montant} />
          <input type="hidden" name="reference" defaultValue={state.orderid} />
          <input type="hidden" name="MAC" defaultValue={state.hash} />
          {/* <input
            type="hidden"
            name="url_retour_ok"
            defaultValue={`${state.url}/paiement-accepte`}
          />
          <input
            type="hidden"
            name="url_retour_err"
            defaultValue={`${state.url}/erreur-paiement`}
          /> */}
          <input type="hidden" name="lgue" defaultValue="FR" />
          <input type="hidden" name="societe" defaultValue={CODE_SITE} />
          <input
            type="hidden"
            name="contexte_commande"
            defaultValue={state.contexte}
          />
          <input type="hidden" name="mail" defaultValue={coordonnees.email} />
          <button
            type="submit"
            className="btn-primary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            disabled={!state.optin}
            name="bouton"
          >
            Je procède au paiement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recapitulatif;
