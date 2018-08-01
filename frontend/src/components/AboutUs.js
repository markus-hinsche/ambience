import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const All = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  padding: 5px 20px;
  color: #ccc;
  font-size: 13px;
  text-align: right;
`;

const linkStyle = css`
  color: #bbb;
  text-decoration: underline;

  &:active {
    outline: none;
  }
`;

const StyledLink = styled.a`
  ${linkStyle};
`;

const StyledImprintLink = styled(Link)`
  ${linkStyle};
`;

class AboutUs extends Component {
  render() {
    return (
      <All>
        <span>Built by </span>
        <StyledLink target="_blank" href="https://twitter.com/markus_hinsche">
          Markus
        </StyledLink>
        <span> and </span>
        <StyledLink target="_blank" href="https://twitter.com/kairollmann">
          Kai
        </StyledLink>
        <span> with ♡ in </span>
        <StyledLink href="https://en.wikipedia.org/wiki/Fehmarn" target="_blank">
          Fehmarn
        </StyledLink>
        <span>. (</span>
        <StyledImprintLink to="/imprint">Imprint</StyledImprintLink>
        <span>)</span>
      </All>
    );
  }
}

export default AboutUs;
