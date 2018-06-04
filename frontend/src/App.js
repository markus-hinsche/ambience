import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import ChatFileDrop from "./ChatFileDrop";
import Header from "./Header";
import Chat from "./Chat";
import AuthorsStats from "./AuthorsStats";
import SectionHeadline from "./SectionHeadline";
import AboutUs from './AboutUs';

// import exampleMessages from "./exampleMessages.json";

const All = styled.div`
  background-color: #fefefe;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
`;
const Results = styled.div``;
const StyledChatFileDrop = styled(ChatFileDrop)`
  flex: 1;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      // messages: exampleMessages,
    };
  }
  render() {
    const hasMessages = this.state.messages && this.state.messages.length > 0;

    return (
      <All>
        <Header />
        {!hasMessages && (
          <StyledChatFileDrop onAnalysisFinished={messages => this.setState({ messages })} />
        )}
        {hasMessages && (
          <Results>
            <SectionHeadline>Statistics</SectionHeadline>
            <AuthorsStats messages={this.state.messages} />
            <SectionHeadline>Chat history</SectionHeadline>
            <Chat messages={this.state.messages} />
          </Results>
        )}
        <AboutUs />
      </All>
    );
  }
}

export default App;
