import Alpine from "alpinejs";
import React from "react";
import ReactDOM from "react-dom";

import Reservation from "./composants/Reservation/Reservation";
import Rappel from "./composants/Rappel";

window.Alpine = Alpine;
Alpine.start();

if (document.getElementById("cse-resa")) {
  if (window.refCse !== undefined) {
    ReactDOM.render(
      <Reservation idresa={window.refCse} />,
      document.getElementById("cse-resa")
    );
  } else {
    ReactDOM.render(<Reservation />, document.getElementById("cse-resa"));
  }
}

if (document.getElementById("cse-rappel")) {
  ReactDOM.render(<Rappel />, document.getElementById("cse-rappel"));
}
