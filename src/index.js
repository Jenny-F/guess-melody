import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const DATA = {
  ERRORS_COUNT: 3,
};

ReactDOM.render(
    <App
      errorsCount={DATA.ERRORS_COUNT}
    />,
    document.querySelector(`#root`)
);
