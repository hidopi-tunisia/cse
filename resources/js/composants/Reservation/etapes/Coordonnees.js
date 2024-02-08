import React, { useReducer, useState, Fragment } from "react";
import { Combobox, Dialog, Transition, Popover } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
  XIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { sub } from "date-fns";
import "react-day-picker/lib/style.css";

import { DaypickerMonthForm } from "../blocs";
import { DATEFORMAT, DATELOCALE } from "../../../constants";
import { formatDate } from "../../../utils/formatters";
import pays from "../../../pays";

const minDate = new Date();
const minYear = minDate.getFullYear();
const fromMonth = new Date(1900, 0);
const toMonth = new Date(minYear, 11);
const france = pays.find((item) => item.iso === "FR");

const DossierPopover = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center">
            <QuestionMarkCircleIcon
              className={`${open ? "text-cse" : ""} w-7 h-7`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-10 left-1/2 -translate-x-1/2 transform w-screen max-w-xs text-xs bg-cse text-white p-3 shadow-sm">
              Votre numéro de dossier CSE LIGNES figure sur votre facture
              d’inscription. Il commence par les lettres CDE ou HOT ou VOY ou VHF ou 
              FAM suivies de 14 chiffres
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const EmailPopover = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center">
            <QuestionMarkCircleIcon
              className={`${open ? "text-cse" : ""} w-7 h-7`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-10 left-1/2 -translate-x-1/2 transform w-screen max-w-xs text-xs bg-cse text-white p-3 shadow-sm">
              IMPORTANT : indiquer une adresse mail valide afin de recevoir la
              confirmation de votre contrat après la validation de votre
              règlement
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const initialState = {
  prune: true,
  isModalOpen: false,
  errors: [],
  month: minDate,
  civilite: "",
  nom: "",
  numero: "",
  prenom: "",
  dateNaissance: null,
  telephone: "",
  email: "",
  emailConfirm: "",
  codePostal: "",
  ville: "",
  adresse: "",
  adresse2: "",
  pays: france,
  prefixe: france,
};

const reducer = (prevState, action) => {
  let local = { ...prevState };

  switch (action.type) {
    case "UPDATE":
      if (Object.keys(local).includes(action.key)) {
        if (action.key === "telephone") {
          local[action.key] = action.payload.replace("+", "");
          break;
        }
        local[action.key] = action.payload;
      }
      break;
    default:
      break;
  }

  return local;
};

const Coordonnees = ({ data, projet, callback }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...data,
  });

  const [query, setQuery] = useState("");
  const [prefix, setPrefix] = useState("");

  const onChange = (event) => {
    dispatch({
      type: "UPDATE",
      key: event.target.id,
      payload: event.target.value,
    });

    if (state.prune === false) {
      validate();
    }
  };

  const handleDateChange = (date) => {
    dispatch({
      type: "UPDATE",
      key: "dateNaissance",
      payload: date,
    });

    if (state.prune === false) {
      validate();
    }
  };

  const handleYearMonthChange = (month) => {
    dispatch({
      type: "UPDATE",
      key: "month",
      payload: month,
    });
  };

  const validate = () => {
    const keys = [
      "civilite",
      "numero",
      "nom",
      "prenom",
      "dateNaissance",
      "telephone",
      "email",
      "codePostal",
      "ville",
      "adresse",
      "pays",
    ];
    let errors = [];

    for (let key of keys) {
      if (state[key] === "" || state[key] === null) {
        errors.push(key);
      }
    }

    if (
      state.numero !== "" &&
      /^(CDE|HOT|VOY|VHF|FAM)\-?\d{14}$/i.test(state.numero) === false
    ) {
      errors.push("numeroValide");
    }

    if (
      state.email !== "" &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        state.email
      ) === false
    ) {
      errors.push("emailValide");
    }

    if (state.email !== "" && state.emailConfirm !== state.email) {
      errors.push("emailConfirm");
    }

    dispatch({
      type: "UPDATE",
      key: "errors",
      payload: errors,
    });

    if (errors.length === 0) {
      return true;
    }

    return false;
  };

  const submit = (event) => {
    event.preventDefault();

    if (validate()) {
      const payload = (({
        numero,
        civilite,
        nom,
        prenom,
        dateNaissance,
        telephone,
        email,
        emailConfirm,
        codePostal,
        ville,
        adresse,
        adresse2,
        pays,
        prefixe,
      }) => ({
        numero,
        civilite,
        nom,
        prenom,
        dateNaissance,
        telephone,
        email,
        emailConfirm,
        codePostal,
        ville,
        adresse,
        adresse2,
        pays,
        prefixe,
      }))(state);

      callback(payload);
    }

    if (state.prune === true) {
      dispatch({ type: "UPDATE", key: "prune", payload: false });
    }
  };

  const filteredPays =
    query === ""
      ? pays
      : pays.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredPrefix =
    prefix === ""
      ? pays.filter((item) => item.prefix !== null)
      : pays.filter(
          (item) =>
            item.prefix !== null &&
            item.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="resa-container">
        <h1 className="resa-title">
          Mes informations personnelles (coordonnées de la personne qui voyage)
        </h1>
        <div className="mb-4">
          <label htmlFor="civilite" className="form-label">
            Numéro de dossier CSE LIGNES
          </label>
          <div className="flex items-center space-x-3">
            <input
              value={state.numero}
              onChange={onChange}
              type="text"
              id="numero"
              className="input-text w-60"
            />
            <DossierPopover />
          </div>
          <div className="resa-error">
            {state.errors.includes("numero")
              ? "Le numéro de dossier CSE LIGNES est obligatoire"
              : ""}
            {state.errors.includes("numeroValide")
              ? "Le numéro de dossier doit commencer par les lettres CDE, HOT, VOY ou VHF ou FAM suivies de 14 chiffres"
              : ""}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 sm:col-span-2 lg:col-span-2">
            <label htmlFor="civilite" className="form-label">
              Civilité
            </label>
            <select
              onChange={onChange}
              value={state.civilite}
              id="civilite"
              className="input-text"
            >
              <option></option>
              <option value="1">Monsieur</option>
              <option value="2">Madame</option>
            </select>
            <div className="resa-error">
              {state.errors.includes("civilite")
                ? "La civilité est obligatoire"
                : ""}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-5 lg:col-span-4">
            <label htmlFor="nom" className="form-label">
              Nom
            </label>
            <input
              value={state.nom}
              onChange={onChange}
              type="text"
              id="nom"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("nom") ? "Le nom est obligatoire" : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-5 lg:col-span-4">
            <label htmlFor="prenom" className="form-label">
              Prénom
            </label>
            <input
              value={state.prenom}
              onChange={onChange}
              type="text"
              id="prenom"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("prenom")
                ? "Le prénom est obligatoire"
                : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <label htmlFor="dateNaissance" className="form-label">
              Date de naissance
            </label>
            <div className="text-sm">
              <DayPickerInput
                value={state.dateNaissance}
                placeholder=""
                format={DATEFORMAT}
                formatDate={formatDate}
                dayPickerProps={{
                  ...DATELOCALE,
                  month: state.month,
                  fromMonth,
                  toMonth,
                  disabledDays: { after: minDate },
                  numberOfMonths: 1,
                  captionElement: ({ date, localeUtils }) => (
                    <DaypickerMonthForm
                      date={date}
                      localeUtils={localeUtils}
                      onChange={handleYearMonthChange}
                      fromMonth={fromMonth}
                      toMonth={toMonth}
                    />
                  ),
                }}
                onDayChange={handleDateChange}
                component={React.forwardRef((props, ref) => (
                  <input
                    type="text"
                    ref={ref}
                    {...props}
                    className="input-text"
                    readOnly
                  />
                ))}
              />
            </div>
            <div className="resa-error">
              {state.errors.includes("dateNaissance")
                ? "La date est obligatoire"
                : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="flex items-center space-x-3">
              <input
                value={state.email}
                onChange={onChange}
                type="text"
                id="email"
                className="input-text"
              />
              <EmailPopover />
            </div>
            <div className="resa-error">
              {state.errors.includes("email") ? "L'email est obligatoire" : ""}
              {state.errors.includes("emailValide")
                ? "L'email doit être valide"
                : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-4">
            <label htmlFor="emailConfirm" className="form-label">
              Confirmer votre email
            </label>
            <input
              value={state.emailConfirm}
              onChange={onChange}
              type="text"
              id="emailConfirm"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("emailConfirm")
                ? "L'email doit être confirmé"
                : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-4">
            <label htmlFor="telephone" className="form-label">
              Téléphone
            </label>
            <div className="flex">
              <Combobox
                value={state.prefixe}
                onChange={(item) => {
                  dispatch({
                    type: "UPDATE",
                    key: "prefixe",
                    payload: item,
                  });
                }}
              >
                <div className="relative">
                  <div className="relative w-24 text-left bg-white cursor-default sm:text-sm overflow-hidden">
                    <Combobox.Input
                      className="input-text"
                      displayValue={(item) => `+${item.prefix}`}
                      onChange={(event) => setPrefix(event.target.value)}
                      autoComplete="off"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setPrefix("")}
                  >
                    <Combobox.Options className="absolute w-60 py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPrefix.length === 0 && query !== "" ? (
                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                          Aucun pays trouvé.
                        </div>
                      ) : (
                        filteredPrefix.map((item) => (
                          <Combobox.Option
                            key={item.iso}
                            className="cursor-default select-none relative py-1 px-2"
                            value={item}
                          >
                            <span className="inline-flex items-center gap-2 truncate">
                              <strong>+{item.prefix}</strong> {item.name}{" "}
                            </span>
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              <input
                value={state.telephone}
                onChange={onChange}
                type="text"
                id="telephone"
                className="input-text"
              />
            </div>
            <div className="resa-error">
              {state.errors.includes("telephone")
                ? "Le téléphone est obligatoire"
                : ""}
            </div>
          </div>

          <h2 className="col-span-12">Adresse</h2>

          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="adresse" className="form-label">
              Numéro et voie
            </label>
            <input
              value={state.adresse}
              onChange={onChange}
              type="text"
              id="adresse"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("adresse")
                ? "L'adresse est obligatoire"
                : ""}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6">
            <label htmlFor="adresse2" className="form-label">
              Complément d'adresse
            </label>
            <input
              value={state.adresse2}
              onChange={onChange}
              type="text"
              id="adresse2"
              className="input-text"
            />
          </div>

          <div className="col-span-4 sm:col-span-3 lg:col-span-2">
            <label htmlFor="pays" className="form-label">
              Pays
            </label>
            <Combobox
              value={state.pays}
              onChange={(item) => {
                dispatch({
                  type: "UPDATE",
                  key: "pays",
                  payload: item,
                });
              }}
            >
              <div className="relative">
                <div className="relative w-full text-left bg-white cursor-default sm:text-sm overflow-hidden">
                  <Combobox.Input
                    className="input-text"
                    displayValue={(item) => item.name}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPays.length === 0 && query !== "" ? (
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Aucun pays trouvé.
                      </div>
                    ) : (
                      filteredPays.map((item) => (
                        <Combobox.Option
                          key={item.iso}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active ? "text-cesa bg-gray-100" : "text-gray-700"
                            }`
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {item.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-cesa" : "text-gray-600"
                                  }`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            <div className="resa-error">
              {state.errors.includes("pays") ? "Le pays est obligatoire" : ""}
            </div>
          </div>

          <div className="col-span-4 sm:col-span-3 lg:col-span-2">
            <label htmlFor="codePostal" className="form-label">
              Code postal
            </label>
            <input
              value={state.codePostal}
              onChange={onChange}
              type="text"
              id="codePostal"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("codePostal")
                ? "Le code postal est obligatoire"
                : ""}
            </div>
          </div>

          <div className="col-span-8 sm:col-span-5">
            <label htmlFor="ville" className="form-label">
              Ville
            </label>
            <input
              value={state.ville}
              onChange={onChange}
              type="text"
              id="ville"
              className="input-text"
            />
            <div className="resa-error">
              {state.errors.includes("ville") ? "La ville est obligatoire" : ""}
            </div>
          </div>
        </div>
        <div className="py-6 text-center">
          <button type="submit" className="btn-primary" onClick={submit}>
            {projet.voyageurs.accompagnants === 0
              ? "Suivant"
              : "Je renseigne mes accompagnants"}
          </button>
        </div>
        <div className="pb-4 text-sm">
          En saisissant ces informations, vous acceptez nos dispositions
          concernant le traitement de vos données personnelles :{" "}
          <button
            type="button"
            className="text-blue-400 hover:text-blue-600"
            onClick={() => {
              dispatch({
                type: "UPDATE",
                key: "isModalOpen",
                payload: true,
              });
            }}
          >
            cliquez ici
          </button>{" "}
          pour plus de détails
        </div>
      </div>

      <Transition appear show={state.isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
            dispatch({ type: "UPDATE", key: "isModalOpen", payload: false });
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-50"
              leave="ease-in duration-200"
              leaveFrom="opacity-50"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  PROTECTION DES DONNEES A CARACTERE itemNEL
                </Dialog.Title>
                <div className="text-sm">
                  <h3 className="mt-6 font-semibold text-red-700">
                    Informatique et Libertés
                  </h3>
                  <p>
                    Les traitements informatiques de données à caractère itemnel
                    issus de ce site sont conformes au Règlement Général sur la
                    Protection des Données du 27 avril 2016, applicable depuis
                    le 25 mai 2018 ainsi qu'à la loi Informatique et Libertés n°
                    78-17 du 6 janvier 1978, modifiée au 6 août 2004. De ce
                    fait, vous disposez d'un droit d'accès, de modification, de
                    rectification et de suppression sur les données collectées
                    sur ce site vous concernant. Pour exercer ces droits,
                    adressez vous par email à dpo@presenceassistance.com.
                  </p>
                  <p>
                    Le traitement des données itemnelles est nécessaire à
                    l'adhésion et l'exécution de son contrat et de ses
                    garanties, à la gestion des relations commerciales et
                    contractuelles, ou à l'exécution de dispositions légales,
                    réglementaires ou administratives en vigueur.
                  </p>
                  <p>
                    <span className="puce">•&nbsp;</span>Les données collectées
                    et traitées sont conservées pour la durée nécessaire à
                    l'exécution du contrat ou de l'obligation légale. Ces
                    données sont ensuite archivées conformément aux durées
                    prévues par les dispositions relatives à la prescription.
                  </p>
                  <p>
                    <span className="puce">•&nbsp;</span>Les destinataires des
                    données le concernant sont, dans la limite de leurs
                    attributions, les services de l'Assureur en charge de la
                    passation, gestion et exécution du Contrat d'assurance et
                    des garanties, ses délégataires, mandataires, partenaires,
                    sous-traitants, réassureurs dans le cadre de l'exercice de
                    leurs missions.
                  </p>
                  <p>
                    Elles peuvent également être transmises s'il y a lieu aux
                    organismes professionnels ainsi qu'à toutes itemnes
                    intervenant au contrat tels qu'avocats, experts, auxiliaires
                    de justice et officiers ministériels, curateurs, tuteurs,
                    enquêteurs.
                  </p>
                  <p>
                    Des informations le concernant peuvent également être
                    transmises au Souscripteur, ainsi qu'à toutes itemnes
                    habilitées au titre de Tiers Autorisés (juridictions,
                    arbitres, médiateurs, ministères concernés, autorités de
                    tutelle et de contrôle et tous organismes publics habilités
                    à les recevoir ainsi qu'aux services en charge du contrôle
                    tels les commissaires aux comptes, auditeurs ainsi que
                    services en charge du contrôle interne).
                  </p>
                  <p>
                    <span className="puce">•&nbsp;</span>En sa qualité
                    d'organisme financier, l'Assureur est soumis aux obligations
                    légales issues principalement du code monétaire et financier
                    en matière de lutte contre le blanchiment des capitaux et
                    contre le financement du terrorisme et, qu'à ce titre, il
                    met en œuvre un traitement de surveillance des contrats
                    pouvant aboutir à la rédaction d'une déclaration de soupçon
                    ou à une mesure de gel des avoirs.
                  </p>
                  <p>
                    <span className="puce">•&nbsp;</span>Ses données itemnelles
                    pourront également être utilisées dans le cadre d'un
                    traitement de lutte contre la fraude à l'assurance pouvant
                    conduire, le cas échéant, à une inscription sur une liste de
                    itemnes présentant un risque de fraude.
                  </p>
                  <p>
                    Les données et les documents concernant l'Assuré sont
                    conservés pour une durée de cinq (5) ans à compter de la
                    clôture du contrat ou de la cessation de la relation.
                  </p>
                  <h3 className="mt-6 font-semibold text-red-700">
                    Droit d'opposition au démarchage téléphonique
                  </h3>
                  <p>
                    Vous êtes un particulier et ne souhaitez pas faire l'objet
                    de prospection commerciale par téléphone, vous pouvez
                    gratuitement vous inscrire sur une liste d'opposition au
                    démarchage téléphonique.
                  </p>
                  <p>
                    Notez toutefois qu'à ce jour, PRESENCE Assistance Tourisme
                    ne pratique pas de démarchage téléphonique.
                  </p>
                  <h3 className="mt-6 font-semibold text-red-700">Cookies</h3>
                  <p>Notre site n'utilise pas de cookies.</p>
                </div>

                <div className="absolute top-0 right-0">
                  <button
                    type="button"
                    className="flex w-9 h-9 justify-center items-center text-sm font-medium text-white bg-gray-700 border border-transparent hover:bg-cse focus:outline-none"
                    onClick={() => {
                      dispatch({
                        type: "UPDATE",
                        key: "isModalOpen",
                        payload: false,
                      });
                    }}
                  >
                    <XIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Coordonnees;
