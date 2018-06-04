import React, { Component } from "react";
import styled from "styled-components";

import { getColorByIntent } from "./helpers";

const All = styled.div`
  border: 1px solid #ededed;
  color: #333;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0 rgba(46, 61, 73, 0.1);
  padding: 10px;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  max-width: 90%;
`;

const Author = styled.p`
  opacity: 0.8;
  margin: 0 0 3px;
  font-size: 12px;
  font-weight: 300;
`;
const Text = styled.p`
  margin: 0;
  font-size: 16px;
`;

const Intent = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 2px 5px;
  color: white;
  font-size: 26px;
  background-color: ${props => getColorByIntent(props.intent)};
  display: flex;
  align-items: flex-start;
  justify-content: ${props => (props.isPrimaryAuthor ? "flex-start" : "flex-end")};
  opacity: 0.4;
  transition: background-color 0.2s, opacity 0.2s, color 0.2s;

  &:hover {
    background-color: transparent;
    color: black;
  }
`;

class Message extends Component {
  render() {
    const isOther =
      !this.props.message.intent || this.props.message.intent.toLowerCase() === "other";

    return (
      <All className={this.props.className}>
        <Author>{this.props.message.name}</Author>
        <Text>{this.props.message.text}</Text>
        <Intent
          isPrimaryAuthor={this.props.isPrimaryAuthor}
          intent={this.props.message.intent || "other"}
          isOther={isOther}>
          {!isOther && this.props.message.intent}
        </Intent>
      </All>
    );
  }
}

export default Message;
