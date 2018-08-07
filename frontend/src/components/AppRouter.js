import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";

import Imprint from "./Imprint";
import Landing from "./Landing";

const All = styled.div`
  background-color: #fefefe;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <All>
        <Route exact={true} path="/" component={Landing} />
        <Route path="/imprint" component={Imprint} />
      </All>
    </BrowserRouter>
  );
};

export default AppRouter;
