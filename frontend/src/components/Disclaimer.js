import React, { Component } from "react";
import styled from "styled-components";

import { MOBILE_MAX } from "../settings";

import tutorial0 from "../01big.png";
import tutorial1 from "../02big.png";

const All = styled.div`
  background-color: #fefefe;
  padding: 20px;
  margin: 0;
  text-align: center;
  max-width: 750px;
`;

const Large = styled.p`
  font-size: 26px;
`;
const Small = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #888;
`;

const Images = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const Step = styled.div``;

const StepTitle = styled.h3`
  margin: 0;
`;

const Img = styled.img`
  height: 400px;
  margin: 10px 30px 0;
  width: auto;
  @media (max-width: ${MOBILE_MAX}) {
    margin: 20px 0 30px;
  }
`;

class Disclaimer extends Component {
  render() {
    return (
      <All>
        <Large>
          Drop{" "}
          <span role="img" aria-label="drop">
            💧
          </span>{" "}
          a chat file{" "}
          <span role="img" aria-label="speechbubble">
            💬
          </span>, or click anywhere in this box.
        </Large>
        <Images>
          <Step>
            <StepTitle>Step 1</StepTitle>
            <Img src={tutorial0} />
          </Step>
          <Step>
            <StepTitle>Step 2</StepTitle>
            <Img src={tutorial1} />
          </Step>
        </Images>
        <Small>
          When you drop or select a file, we will process it in the backend to deliver the best
          possible chat analysis. We will not store or log any of the contents anywhere. If you drop
          a file, you'll agree and trust us on that.
        </Small>
      </All>
    );
  }
}

export default Disclaimer;
