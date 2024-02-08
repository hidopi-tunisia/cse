import React from "react";
import { format } from "date-fns";
import { useDeepCompareEffect } from "react-use";

import { reservation } from "../../../api/reservation-client";

const PSID = process.env.MIX_INGENICO_PSID;
const URL_PAIEMENT = process.env.MIX_INGENICO_URL;

const RecapitulatifOgone = ({ coordonnees, accompagnants, projet, assurance }) => {
  let [state, setState] = React.useState({
    loading: true,
    error: false,
    hash: null,
    id: null,
    url: null,
    optin: false,
  });

  const nomComplet = `${coordonnees.prenom} ${coordonnees.nom}`
    .trim()
    .toUpperCase();
  let noms = coordonnees.prenom;
  let part = "part";

  useDeepCompareEffect(() => {
    const fetchData = async () => {
      const res = await reservation({
        coordonnees,
        accompagnants,
        projet,
        assurance,
      });
      if (res.success === true && res.body.shasign) {
        setState({
          ...state,
          hash: res.body.shasign,
          orderid: res.body.id,
          url: res.body.url,
          error: false,
          loading: false,
        });
      } else {
        setState({
          ...state,
          hash: null,
          id: null,
          url: null,
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

  const urlRetourSite = `${state.url}/acheter-une-assurance?id=${state.orderid}`;

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
        bancaire ,
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
        <form method="post" action={URL_PAIEMENT}>
          <input type="hidden" name="PSPID" value={PSID} />
          <input type="hidden" name="ORDERID" value={state.orderid} />
          <input type="hidden" name="AMOUNT" value={assurance.prix} />
          <input type="hidden" name="CURRENCY" value="EUR" />
          <input type="hidden" name="LANGUAGE" value="fr_FR" />
          <input type="hidden" name="CN" value={nomComplet} />
          <input type="hidden" name="LOGO" value="logo-presence.png" />
          <input type="hidden" name="BACKURL" value={urlRetourSite} />
          <input type="hidden" name="CANCELURL" value={urlRetourSite} />
          <input type="hidden" name="HOMEURL" value={state.url} />
          <input
            type="hidden"
            name="EMAIL"
            value={coordonnees.email.toUpperCase()}
          />
          <input type="hidden" name="OWNERZIP" value={coordonnees.codePostal} />
          <input
            type="hidden"
            name="OWNERTELNO"
            value={`+${coordonnees.prefixe.prefix}${coordonnees.telephone}`}
          />
          <input type="hidden" name="SHASIGN" value={state.hash} />
          <button
            type="submit"
            className="btn-primary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            disabled={!state.optin}
          >
            Je procède au paiement
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecapitulatifOgone;
