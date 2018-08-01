import React, { Component } from "react";
import styled from "styled-components";

import ChatFileDrop from "./ChatFileDrop";
import Header from "./Header";
import Chat from "./Chat";
import AuthorsStats from "./AuthorsStats";
import SectionHeadline from "./SectionHeadline";
import AboutUs from "./AboutUs";

import exampleMessages from "../exampleMessages.json";

const USE_EXAMPLE_MESSAGES = true;

const All = styled.div`
  background-color: #fefefe;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  width: 100%;
  overflow-x: hidden;
`;
const Results = styled.div``;
const StyledChatFileDrop = styled(ChatFileDrop)`
  flex-grow: 1;
`;

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: USE_EXAMPLE_MESSAGES ? exampleMessages : [],
    };
  }
  render() {
    const hasMessages = this.state.messages && this.state.messages.length > 0;

    return (
      <All>
        <Header loaded={hasMessages} />
        {!hasMessages && (
          <StyledChatFileDrop onAnalysisFinished={messages => this.setState({ messages })} />
        )}
        {hasMessages && (
          <Results>
            <SectionHeadline>Articulation</SectionHeadline>
            <AuthorsStats messages={this.state.messages} />
            <SectionHeadline>Chat Analysis</SectionHeadline>
            <Chat messages={this.state.messages} />
          </Results>
        )}
        <AboutUs />
      </All>
    );
  }
}

export default Landing;
