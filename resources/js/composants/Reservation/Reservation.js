import React from "react";
import { parse } from "date-fns";

import {
  Projet,
  Assurances,
  Coordonnees,
  Accompagnants,
  Recapitulatif,
} from "./etapes";
import { commande } from "../../api/commande-client";

const initialState = {
  loading: false,
  erreur: null,
  etape: 0,
  projet: null,
  assurances: [],
  assurance: null,
  coordonnees: null,
  accompagnants: [],
  transport: "",
  source: "",
};

const reducer = (prevState, action) => {
  let local = { ...prevState };

  switch (action.type) {
    case "PROJET":
      local.projet = action.payload;
      local.assurances = [];
      local.assurance = null;

      // Réinitialiser les accompagnants si leur nombre change
      const num = parseInt(local.projet.voyageurs.accompagnants, 10);
      if (local.accompagnants.length !== num) {
        local.accompagnants = [];
        for (let i = 0; i < num; i++) {
          local.accompagnants.push({
            nom: "",
            prenom: "",
            dateNaissance: null,
          });
        }
      }

      local.etape = 1;
      break;
    case "ASSURANCE":
      local.assurances = action.payload.assurances;
      local.assurance = action.payload.assurance;
      local.etape = 2;
      break;
    case "COORDONNEES":
      local.coordonnees = action.payload;
      // On passe directement au récap si pas d'accompagnants
      local.etape =
        parseInt(local.projet.voyageurs.accompagnants, 10) === 0 ? 4 : 3;
      break;
    case "ACCOMPAGNANTS":
      local.accompagnants = action.payload;
      local.etape = 4;
      break;
    case "UPDATE":
      if (Object.keys(local).includes(action.key)) {
        local[action.key] = action.payload;
      }
      break;
    case "INIT":
      local.loading = false;
      local.erreur = null;
      local.projet = {
        destination: action.payload.destination,
        voyageurs: {
          type: action.payload.accompagnants.length === 0 ? "1" : "2",
          accompagnants: String(action.payload.accompagnants.length),
        },
        dates: {
          from: parse(action.payload.depart, "dd/MM/yyyy", new Date()),
          to: parse(action.payload.retour, "dd/MM/yyyy", new Date()),
        },
        montant: action.payload.montant,
      };
      local.coordonnees = {
        numero: action.payload.numero,
        civilite: "",
        nom: action.payload.voyageur.nom,
        prenom: action.payload.voyageur.prenom,
        dateNaissance: null,
        telephone: "",
        email: action.payload.voyageur.email,
        emailConfirm: action.payload.voyageur.email,
        codePostal: "",
        ville: "",
        adresse: "",
        adresse2: "",
      };
      local.accompagnants = action.payload.accompagnants;
      local.transport = action.payload.transport;
      local.source = action.payload.source;
      break;
    case "INITERROR":
      local.loading = false;
      local.erreur = action.payload[0];
      break;
    case "SAISIE":
      local.erreur = null;
      local.transport = "";
      local.source = "";
      break;
    case "RETOUR":
      local.etape = 0;
      local.transport = "";
      local.source = "";
      break;
    default:
      break;
  }

  return local;
};

const Reservation = ({ idresa }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    loading: idresa !== undefined ? true : false,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await commande({ ref: idresa });
      if (res.success === true) {
        dispatch({ type: "INIT", payload: res.body });
      } else {
        dispatch({ type: "INITERROR", payload: res.erreurs });
      }
    };

    if (idresa) {
      fetchData();
    }
  }, [idresa]);

  const updateProjet = React.useCallback((data) => {
    dispatch({ type: "PROJET", payload: data });
  }, []);

  const updateAssurance = React.useCallback((data) => {
    if (data.hasOwnProperty("retour")) {
      dispatch({ type: "RETOUR" });
      return;
    }
    dispatch({ type: "ASSURANCE", payload: data });
  }, []);

  const updateCoordonnees = React.useCallback((data) => {
    dispatch({ type: "COORDONNEES", payload: data });
  }, []);

  const updateAccompagnants = React.useCallback((data) => {
    dispatch({ type: "ACCOMPAGNANTS", payload: data });
  }, []);

  const saisie = React.useCallback(() => {
    dispatch({ type: "SAISIE" });
  }, []);

  if (state.loading === true) {
    return (
      <div className="py-24 text-center text-lg leading-7 text-gray-600">
        Nous sommes en train de récupérer les informations sur votre voyage.
        <br />
        Veuillez patienter...
        <div className="flex justify-center pt-4">
          <svg
            className="animate-spin h-8 w-8 text-cse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-10"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-50"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  if (state.erreur !== null) {
    return (
      <div className="py-24 text-center text-lg">
        Nous n'avons pas pu récupérer les informations sur votre voyage.
        <br />
        <button onClick={saisie} className="btn-primary w-auto mx-auto mt-10">
          Je saisis mes informations
        </button>
      </div>
    );
  }

  let content;
  switch (state.etape) {
    case 0:
      content = <Projet data={state.projet} callback={updateProjet} />;
      break;
    case 1:
      content = (
        <Assurances
          projet={state.projet}
          data={state.assurances}
          callback={updateAssurance}
        />
      );
      break;
    case 2:
      content = (
        <Coordonnees
          data={state.coordonnees}
          projet={state.projet}
          callback={updateCoordonnees}
        />
      );
      break;
    case 3:
      content = (
        <Accompagnants
          data={state.accompagnants}
          callback={updateAccompagnants}
        />
      );
      break;
    case 4:
      content = (
        <Recapitulatif
          projet={state.projet}
          coordonnees={state.coordonnees}
          assurance={state.assurance}
          accompagnants={state.accompagnants}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="container mx-auto my-4 p-6 text-xl text-gray-600 space-y-12">
      {content}
    </div>
  );
};

export default Reservation;
