import React from "react";
import ReactDOM from "react-dom";
import "isomorphic-fetch";

import "./index.css";
import AppRouter from "./components/AppRouter";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppRouter />, document.getElementById("root"));
registerServiceWorker();
