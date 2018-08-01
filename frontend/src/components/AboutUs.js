import React, { Component } from "react";
import styled from "styled-components";

const All = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  padding: 5px 20px;
  color: #ccc;
  font-size: 13px;
`;

const Link = styled.a`
  color: #bbb;
  text-decoration: underline;

  &:active {
    outline: none;
  }
`;

class AboutUs extends Component {
  render() {
    return (
      <All>
        <span>Built by </span>
        <Link target="_blank" href="https://twitter.com/markus_hinsche">
          Markus
        </Link>
        <span> and </span>
        <Link target="_blank" href="https://twitter.com/kairollmann">
          Kai
        </Link>
        <span> with ♡ in </span>
        <Link href="https://en.wikipedia.org/wiki/Fehmarn" target="_blank">
          Fehmarn
        </Link>
        <span>.</span>
      </All>
    );
  }
}

export default AboutUs;
