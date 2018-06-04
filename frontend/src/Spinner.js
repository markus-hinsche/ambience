import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const SpinAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Svg = styled.svg`
  height: 50px;
  width: 50px;

  animation: ${SpinAnimation} 0.4s linear infinite;
`;

class Spinner extends Component {
  render() {
    return (
      <Svg width="50" height="50" viewBox="0 0 200 200">
        <g>
          <path
            d="M160,100 C160,88.954305 168.954305,80 180,80 C191.045695,80 200,88.954305 200,100 C200,155.228475 155.228475,200 100,200 C45.3753396,200 0.980226762,156.2021 0.0160099307,101.807649 C0.00537024287,101.539754 0,101.270504 0,101 C0,100.896834 0.000781126491,100.79385 0.00233778779,100.691054 C0.000780094503,100.460887 0,100.230534 0,100 L0.0245650065,100 C0.545596315,89.4188885 9.28962978,81 20,81 C30.7103702,81 39.4544037,89.4188885 39.975435,100 L40,100 C40,133.137085 66.862915,160 100,160 C133.137085,160 160,133.137085 160,100 Z"
            fill="#444444"
          />
        </g>
      </Svg>
    );
  }
}

export default Spinner;
