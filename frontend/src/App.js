import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import ChatFileDrop from "./ChatFileDrop";
import Header from "./Header";
import Chat from "./Chat";
import AuthorsStats from "./AuthorsStats";

// import exampleMessages from "./exampleMessages.json";

const All = styled.div``;
const Results = styled.div``;

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
        <Header hasMessages={hasMessages} />
        {!hasMessages && (
          <ChatFileDrop onAnalysisFinished={messages => this.setState({ messages })} />
        )}
        {hasMessages && (
          <Results>
            <AuthorsStats messages={this.state.messages} />
            <Chat messages={this.state.messages} />
          </Results>
        )}
      </All>
    );
  }
}

export default App;
