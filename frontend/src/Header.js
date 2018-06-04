import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const All = styled.div`
  background-color: #0d3b66;
  color: #fefefe;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Tutorial = styled.div`
  background-color: #3d5b86;
  color: #fefefe;
  width: 100%;
  text-align: center
  padding: 20px;
`;

class Header extends Component {
  render() {
    return (
      <All>
        <h1>Ambience</h1>
        <Tutorial>
          {this.props.hasMessages ? "Here's your analysis" : "To get started, drop a text file."}
        </Tutorial>
      </All>
    );
  }
}

export default Header;
