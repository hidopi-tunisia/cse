import React from "react";
import slugify from "slugify";

import { useOnClickOutside } from "../../../utils/hooks";
import pays from "../../../pays";

const reducer = (prevState, action) => {
  let local = { ...prevState };

  switch (action.type) {
    case "SOURCE":
      local.destination = null;
      local.open = false;
      const num = action.payload.length;

      if (num === 0) {
        // No results we reset
        local.items = [];
        if (local.terme.length > 2) {
          local.open = true;
        }
      }

      if (num >= 1 && local.terme !== "") {
        local.items = action.payload;
        local.open = true;
      }

      break;
    case "SELECTED":
      local.destination = local.items[action.payload];
      local.items = [];
      local.terme = `${local.destination.pre} ${local.destination.name}`;
      local.open = false;
      break;
    case "UPDATE":
      if (Object.keys(local).includes(action.key)) {
        local[action.key] = action.payload;
      }
      break;
    default:
      break;
  }

  return local;
};

const Pays = ({ items, callback }) => {
  if (items.length === 0) {
    return (
      <ul className="list-none divide-y">
        <li className="py-2 px-4">Aucune destination trouvée</li>
      </ul>
    );
  }

  let rows = [];
  items.map((item, index) =>
    rows.push(
      <li key={`pays-${index}`}>
        <button
          value={index}
          onClick={callback}
          className="w-full py-2 px-4 rounded-0 bg-white hover:bg-red-100 focus:outline-none transition duration-150 ease-in-out"
        >
          {item.name}
        </button>
      </li>
    )
  );

  return <ul className="list-none divide-y">{rows}</ul>;
};

const Destination = ({ data, callback }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    terme:
      data !== undefined && data !== null ? `${data.pre} ${data.name}` : "",
    selected: data ? 0 : null,
    destination: data,
    items: [],
  });

  const ref = React.useRef();

  const closeDropdown = () => {
    dispatch({ type: "UPDATE", key: "open", payload: false });
  };

  useOnClickOutside(ref, closeDropdown);

  const onItemSelected = (event) => {
    dispatch({ type: "SELECTED", payload: event.target.value });
    callback({ key: "destination", payload: state.items[event.target.value] });
  };

  /**
   * Filter the countries
   * @param {string} needle The term
   * @returns array
   */
  const getOptions = (needle) => {
    const escapedValue = slugify(needle, {
      replacement: "-",
      lower: true,
      trim: true,
    });

    if (escapedValue === "") {
      return [];
    }

    // const regex = new RegExp("^" + escapedValue, "i");
    const regex = new RegExp(escapedValue, "i");
    return pays.filter((item) => regex.test(item.slug));
  };

  /**
   * Input onChange handler
   * @param {*} event
   * @returns
   */
  const onInputChange = (event) => {
    const terme = event.target.value;

    dispatch({ type: "UPDATE", key: "terme", payload: terme });

    if (terme.length <= 2) {
      // Clear options and selected destination
      dispatch({ type: "SOURCE", payload: [] });
      callback({ key: "destination", payload: null });

      return;
    }

    if (state.destination !== null && state.destination.nom === terme) {
      // Do nothing if term equals the selected destination's name
      return;
    }

    // Get the options
    const options = getOptions(terme);
    dispatch({ type: "SOURCE", payload: options });
  };

  /**
   * Input focus handler
   */
  const onInputFocus = () => {
    if (state.items.length > 0 && state.open === false) {
      dispatch({ type: "UPDATE", key: "open", payload: true });
    }
  };

  return (
    <div className="relative flex justify-start items-center">
      <label>{state.destination === null ? "Je pars en" : "Je pars"}</label>
      <div className="relative">
        <input
          className="input-projet w-80"
          value={state.terme}
          onChange={onInputChange}
          onFocus={onInputFocus}
        />
        {state.open ? (
          <div
            ref={ref}
            className="border absolute object-left-top shadow-lg bg-white z-50"
          >
            <Pays items={state.items} callback={onItemSelected} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Destination;
