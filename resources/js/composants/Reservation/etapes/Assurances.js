import React from "react";
import { useDeepCompareEffect } from "react-use";

import Assurance from "../blocs/Assurance";
import { assurances } from "../../../api/reservation-client";

const initialState = {
  loading: true,
  assurances: [],
  erreur: null,
};

const reducer = (prevState, action) => {
  let local = { ...prevState };

  switch (action.type) {
    case "UPDATE":
      if (Object.keys(local).includes(action.key)) {
        local[action.key] = action.payload;
      }
      break;
    case "FETCHED":
      local.assurances = action.payload;
      local.erreur = null;
      local.loading = false;
      break;
    case "ERREUR":
      local.assurances = [];
      local.erreur = action.payload;
      local.loading = false;
      break;
    default:
      break;
  }

  return local;
};

const Assurances = ({ projet, data, callback }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    assurances: data,
  });

  useDeepCompareEffect(() => {
    const fetchData = async () => {
      try {
        const res = await assurances({ projet });
        if (res.success === true && res.body.length > 0) {
          dispatch({ type: "FETCHED", payload: res.body });
        } else {
          dispatch({ type: "ERREUR", payload: res.erreurs[0] });
        }
      } catch (err) {
        dispatch({
          type: "ERREUR",
          payload: "Impossible de récupérer la liste des assurances.",
        });
      }
    };

    fetchData();
  }, [projet]);

  const gotoProjet = () => {
    callback({ retour: true });
  };

  const itemCallback = (key) => {
    callback({
      assurance: state.assurances[key],
      assurances: state.assurances,
    });
  };

  if (state.loading) {
    return (
      <div className="py-24 text-center text-lg leading-7 text-gray-600">
        Nous recherchons les assurances qui correspondent à vos critères.
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
      <div className="py-24 text-center text-lg leading-7 text-gray-600">
        L'erreur suivante est survenue : <br />
        <div className="text-red-400 font-medium">{state.erreur}</div>
        <button
          onClick={gotoProjet}
          className="btn-primary w-auto mx-auto mt-10"
        >
          Je modifie mon projet
        </button>
      </div>
    );
  }

  // Si pas de résultats retour aux critères
  if (state.assurances.length === 0) {
    return (
      <div className="py-24 text-center text-lg leading-7 text-gray-600">
        Nous n'avons pas pu trouver des assurances correspondant à votre projet.
        <button
          onClick={gotoProjet}
          className="btn-primary w-auto mx-auto mt-10"
        >
          Je modifie mon projet
        </button>
      </div>
    );
  }

  return (
    <div className="resa-container">
      <h1 className="resa-title">Je choisis mon assurance</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.assurances.map((item, index) => (
          <Assurance
            data={item}
            callback={itemCallback}
            key={`pays-${index}`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Assurances;
