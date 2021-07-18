import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";

// Redux import
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
// thunk est une middleware qui permet de faire des requete asynchrone avec redux
import thunk from "redux-thunk";
// Contient tout les reducer
import rootReducer from "./reducers";

// Dev tools pour redux
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
  // composeWithDevTools applique l'outil de notre choix au moment du dev par ex :
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
