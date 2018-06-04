import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import Message from "./Message";

const All = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  max-width: 600px;
  margin: 0 auto;
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => (props.isPrimaryAuthor ? "flex-end" : "flex-start")};
  margin: 3px;
`;

const StyledMessage = styled(Message)`
  border-top-left-radius: ${props => (props.isPrimaryAuthor ? "8px" : "0")};
  border-top-right-radius: ${props => (props.isPrimaryAuthor ? "0" : "8px")};
  background-color: ${props => (props.isGreet ? "red" : "white")};
  text-align: ${props => (props.isPrimaryAuthor ? "right" : "left")};
`;

class Chat extends Component {
  render() {
    return (
      <All>
        {this.props.messages.map(message => {
          const isPrimaryAuthor = this.props.messages[0].name === message.name;

          return (
            <MessageWrapper isPrimaryAuthor={isPrimaryAuthor}>
              <StyledMessage
                isPrimaryAuthor={isPrimaryAuthor}
                isGreet={message.intent === "greet"}
                message={message}
              />
            </MessageWrapper>
          );
        })}
      </All>
    );
  }
}

export default Chat;
