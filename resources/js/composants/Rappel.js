import React from "react";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";
import { format, startOfToday } from "date-fns";
import "flatpickr/dist/themes/dark.css";

const API_URL = process.env.MIX_APP_API_URL;

const Heures = (props) => {
  const options = [];
  options.push(
    <option value="9:30" key="h9_30">
      9:30
    </option>
  );

  for (let i = 10; i < 17; i++) {
    options.push(
      <option value={`${i}:00`} key={`h${i}_00`}>
        {i}:00
      </option>
    );
    options.push(
      <option value={`${i}:30`} key={`h${i}_30`}>
        {i}:30
      </option>
    );
  }

  options.push(
    <option value="17:00" key="h17_00">
      17:00
    </option>
  );

  return <select {...props}>{options}</select>;
};

const Rappel = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [apiErrors, setApiErrors] = React.useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isLoading) {
      return;
    }

    data.date_rappel = format(data.date_rappel[0], "yyyy-MM-dd");

    setIsLoading(true);
    setApiErrors("");

    fetch("demande-de-rappel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok === false) {
          const validation = await response.json();
          let validationErrors = Object.values(validation.errors);
          validationErrors = validationErrors.map((item) => item[0]);
          setApiErrors(`${validationErrors.join(". ")}.`);
        } else {
          setIsSuccess(true);
          setTimeout(() => {
            reset({
              nom: "",
              telephone: "",
              date_rappel: null,
              heure_rappel: "9:30",
            });
            setIsSuccess(false);
          }, 5000);
        }
        return;
      })
      .catch((err) => {
        setApiErrors("Une erreur est survenue, veuillez réessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isSuccess === true) {
    return (
      <div className="mt-3 px-6 py-4 bg-green-500 text-white text-center font-bold">
        Votre demande a été enregistrée. Notre équipe vous recontactera bientôt.
      </div>
    );
  }

  return (
    <form>
      <div
        className={`flex flex-col md:flex-row md:items-start ${
          isLoading ? "disabled" : ""
        }`}
      >
        <div className="flex-1">
          <div className="flex">
            <div className="form-group flex-1">
              <label htmlFor="nom">Nom et prénom</label>
              <input
                type="text"
                id="nom"
                placeholder="Votre nom et prénom"
                disabled={isLoading}
                {...register("nom", { required: true })}
              />
              <div className="error-message"></div>
            </div>
            <div className="form-group flex-0 w-44">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="text"
                id="telephone"
                placeholder="Votre téléphone"
                disabled={isLoading}
                {...register("telephone", {
                  required: true,
                  pattern: { value: /^(0|\+33) *[1-9]( *[0-9]{2}){4}$/ },
                })}
              />
            </div>
          </div>
          <div className="error-message">
            {errors.nom?.type === "required" ? (
              <div>Le nom est obligatoire</div>
            ) : null}
            {errors.telephone?.type === "required" ? (
              <div>Le téléphone est obligatoire</div>
            ) : null}
            {errors.telephone?.type === "pattern" ? (
              <div>Le numéro de téléphone n'est pas valide</div>
            ) : null}
          </div>
        </div>
        <div className="flex-0 w-60 mt-2 md:mt-0">
          <div className="flex items-end">
            <div className="form-group flex-0 w-28">
              <label htmlFor="date_rappel">Date de rappel</label>
              <Controller
                control={control}
                name="date_rappel"
                id="date_rappel"
                rules={{ required: true }}
                render={({ field: { ref, ...rest } }) => (
                  <Flatpickr
                    options={{
                      minDate: startOfToday(),
                      dateFormat: "d/m/y",
                      locale: French,
                      disableMobile: true,
                      disable: [
                        function (date) {
                          return date.getDay() === 0 || date.getDay() === 6;
                        },
                      ],
                    }}
                    disabled={isLoading}
                    {...rest}
                  />
                )}
              />
            </div>
            <div className="form-group flex-0 w-20">
              <label htmlFor="heure_rappel">Heure</label>
              <Controller
                control={control}
                defaultValue="9:30"
                name="heure_rappel"
                id="heure_rappel"
                rules={{ required: true }}
                render={({ field: { ref, ...rest } }) => (
                  <Heures disabled={isLoading} {...rest} />
                )}
              />
            </div>
            <div className="flex-0 w-12">
              <button
                className="flex w-full mt-1 py-2 px-3 h-[42px] leading-6 text-center bg-gray-500 border border-gray-700 hover:bg-cse"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner border-gray-50 border-t-red-300"></div>
                ) : (
                  "OK"
                )}
              </button>
            </div>
          </div>
          <div className="error-message">
            {errors.date_rappel?.type === "required" &&
              "La date est obligatoire"}
          </div>
        </div>
      </div>
      {apiErrors !== "" ? (
        <div className="error-message">{apiErrors}</div>
      ) : null}
    </form>
  );
};

export default Rappel;
