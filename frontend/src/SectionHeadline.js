import React, { Component } from "react";
import styled from "styled-components";
import { COLS } from "./colors";

const All = styled.p`
  font-size: 50px;
  margin: 0;
  width: 100%;
  padding: 0;
  height: 100px;
  background-color: ${COLS["light"]};
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: left;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 0.6;
  margin-bottom: 40px;
`;

class SectionHeadline extends Component {
  render() {
    return <All className={this.props.className}>{this.props.children}</All>;
  }
}

export default SectionHeadline;
