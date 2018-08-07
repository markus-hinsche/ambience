import React, { Component, Fragment } from "react";
import styled from "styled-components";

import ChatFileDrop from "./ChatFileDrop";
import Header from "./Header";
import Chat from "./Chat";
import AuthorsStats from "./AuthorsStats";
import SectionHeadline from "./SectionHeadline";
import AboutUs from "./AboutUs";

import exampleMessages from "../demo_chat.json";

const Results = styled.div``;
const StyledChatFileDrop = styled(ChatFileDrop)``;

const ExampleHeadline = styled.h3`
  text-align: center;
  font-size: 40px;
  font-weight: 300;
  color: #777;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 20px 40px;
  margin: 0 auto;
  display: inline-block;
`;

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasExampleMessages: true,
      messages: exampleMessages,
    };
  }
  render() {
    const { hasExampleMessages, messages } = this.state;

    return (
      <Fragment>
        <Header loaded={hasExampleMessages} />
        {hasExampleMessages && (
          <StyledChatFileDrop
            onAnalysisFinished={messages => this.setState({ messages, hasExampleMessages: false })}
          />
        )}
        {hasExampleMessages && (
          <ExampleHeadline>
            EXAMPLE{" "}
            <span role="img" ara-label="down">
              👇
            </span>
          </ExampleHeadline>
        )}
        <Results>
          <SectionHeadline>Articulation Statistic</SectionHeadline>
          <AuthorsStats messages={messages} />
          <SectionHeadline>Chat Analysis</SectionHeadline>
          <Chat messages={messages} />
        </Results>
        )}
        <AboutUs />
      </Fragment>
    );
  }
}

export default Landing;
