import React from "react";
import ReactDOM from "react-dom";
import "isomorphic-fetch";

import "./index.css";
import Landing from "./components/Landing";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Landing />, document.getElementById("root"));
registerServiceWorker();
