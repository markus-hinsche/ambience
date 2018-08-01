import React, { Component } from "react";
import styled from "styled-components";
import { COLS } from "../colors";
import { MOBILE_MAX } from "../settings";

const All = styled.p`
  font-size: 50px;
  margin: 0;
  width: 100%;
  padding: 0;
  color: #555;
  margin: 40px auto;
  text-align: center;
  line-height: 1;
  font-family: "Lobster", cursive;
  @media (max-width: ${MOBILE_MAX}) {
    font-size: 30px;
  }
`;

class SectionHeadline extends Component {
  render() {
    return <All className={this.props.className}>{this.props.children}</All>;
  }
}

export default SectionHeadline;
