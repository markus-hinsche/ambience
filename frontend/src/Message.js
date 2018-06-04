import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import ChatFileDrop from "./ChatFileDrop";
import Header from "./Header";

const All = styled.div`
  border: 1px solid #ededed;
  color: #0d3b66;
  background-color: white;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0 rgba(46, 61, 73, 0.1);
  padding: 10px;
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
  margin: 0;
  color: ${props => (props.isOther ? "#999" : "red")};
  font-size: 10px;
`;

class Message extends Component {
  render() {
    return (
      <All className={this.props.className}>
        <Author>{this.props.message.name}</Author>
        <Text>{this.props.message.text}</Text>
        <Intent isOther={!this.props.message.intent || this.props.message.intent === "Other"}>
          {this.props.message.intent || "Other"}
        </Intent>
      </All>
    );
  }
}

export default Message;
