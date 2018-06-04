import React, { Component } from "react";
import styled from "styled-components";

const All = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Headline = styled.h1`
  width: 100%;
  background-color: #2c3e50;
  margin: 0;
  font-size: 70px;
  letter-spacing: 3px;
  font-weight: 300;
  padding: 20px 0;
  text-align: center;
  line-height: 0.35;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 40px 0 0;

  color: #fefefe;
`;

class Header extends Component {
  render() {
    return (
      <All>
        <Headline>Ambience</Headline>
      </All>
    );
  }
}

export default Header;
