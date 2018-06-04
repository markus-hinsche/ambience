import React, { Component } from "react";
import styled from "styled-components";

const All = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
`;

const HeadlineWrap = styled.div`
  padding: 40px 0 0;
  margin: 0;
  width: 100%;
  background-color: #2c3e50;
`;

const Headline = styled.h1`
  font-size: 70px;
  letter-spacing: 3px;
  font-weight: 300;
  text-align: right;
  line-height: 0.35;
  margin: 0;

  color: #fefefe;
`;

class Header extends Component {
  render() {
    return (
      <All>
        <HeadlineWrap>
          <Headline>Ambience</Headline>
        </HeadlineWrap>
      </All>
    );
  }
}

export default Header;
