import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Assurance = ({ index, data, callback }) => {
  const [optin, setOptin] = React.useState(false);
  const cleanRecap = DOMPurify.sanitize(data.recap, {
    USE_PROFILES: { html: true },
  });
  const recap = parse(cleanRecap);

  const onClick = (ev) => {
    callback(parseInt(ev.target.value, 10));
  };

  const onOptinChange = (ev) => {
    setOptin(ev.target.checked);
  };

  return (
    <div className="flex flex-col justify-between p-3 border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300">
      <div className="mb-6 flex-1">
        <div className="px-2 py-1 mb-2 text-sm text-white bg-red-700 font-bold">
          {data.libelle}
        </div>
        <div className="text-3xl font-bold text-red-700">{data.prix_eur}</div>
        <div className="mt-2 recap">{recap}</div>
      </div>
      <div className="flex flex-0 mb-2 text-xs">
        <input
          onChange={onOptinChange}
          id="optin"
          name="optin"
          type="checkbox"
          className="h-4 w-4 mr-2 text-cse border-gray-300 rounded cursor-pointer focus:ring-red-200"
        />
        <label htmlFor="optin">
          Je reconnais avoir pris connaissance du{" "}
          <a
            href={data.fiche}
            target="_blank"
            className="text-blue-400 hover:text-blue-600"
          >
            document d'information normalisé
          </a>{" "}
          de l'assurance.
        </label>
      </div>
      <button
        value={index}
        onClick={onClick}
        className="btn-primary w-full disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
        disabled={!optin}
      >
        Je m'assure
      </button>
    </div>
  );
};

export default Assurance;
