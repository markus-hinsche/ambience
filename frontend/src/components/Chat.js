import React, { Component, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";

import Message from "./Message";

const All = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  max-width: 700px;
  margin: 0 auto;
  padding: 10px;
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => (props.isPrimaryAuthor ? "flex-end" : "flex-start")};
  margin: 3px;
`;

const StyledMessage = styled(Message)`
  border-top-left-radius: ${props => (props.isPrimaryAuthor ? "12px" : "0")};
  border-top-right-radius: ${props => (props.isPrimaryAuthor ? "0" : "12px")};
  background-color: white;
  text-align: ${props => (props.isPrimaryAuthor ? "right" : "left")};
`;

const Line = styled.div`
  border-top: 1px solid #ccc;
  width: 100%;
  margin: 20px 0;
  padding: 5px;
  font-size: 12px;
  color: #ccc;
  text-align: center;
`;

function isHourSwitch(i, messages) {
  const time = moment(messages[i].time, "M/DD/YY, hh:mm a").startOf("hour");
  const prevTime = moment(messages[i - 1].time, "M/DD/YY, hh:mm a").startOf("hour");

  return prevTime.isBefore(time);
}

function getHourStamp(message) {
  return moment(message.time, "M/DD/YY, hh:mm a")
    .startOf("hour")
    .format("lll");
}

class Chat extends Component {
  render() {
    return (
      <All>
        {this.props.messages.map((message, i) => {
          const isPrimaryAuthor = this.props.messages[0].name === message.name;

          return (
            <Fragment>
              {i > 0 &&
                isHourSwitch(i, this.props.messages) && <Line>{getHourStamp(message)}</Line>}
              <MessageWrapper key={message.time + i} isPrimaryAuthor={isPrimaryAuthor}>
                <StyledMessage
                  isPrimaryAuthor={isPrimaryAuthor}
                  isGreet={message.intent === "greet"}
                  message={message}
                />
              </MessageWrapper>
            </Fragment>
          );
        })}
      </All>
    );
  }
}

export default Chat;
