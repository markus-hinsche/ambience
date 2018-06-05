import React, { Component } from "react";
import styled from "styled-components";
import { COLS } from "./colors";

const All = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
`;

const HeadlineWrap = styled.div`
  padding: 30px 0 0;
  margin: 0;
  width: 100%;
  background: linear-gradient(${COLS["gray"]}, #aaa);
`;

const Headline = styled.h1`
  font-size: 70px;
  letter-spacing: 3px;
  font-weight: 300;
  text-align: right;
  line-height: 0.5;
  margin: 0 20px;

  color: white;
  opacity: ${props => (props.loaded ? "1" : "0.3")};
`;

class Header extends Component {
  render() {
    return (
      <All>
        <HeadlineWrap>
          <Headline loaded={this.props.loaded}>Ambience</Headline>
        </HeadlineWrap>
      </All>
    );
  }
}

export default Header;
