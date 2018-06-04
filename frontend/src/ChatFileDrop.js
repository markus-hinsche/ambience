import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import Spinner from "./Spinner";

function onDropFile(files, onStart, onSuccess, onError) {
  onStart();

  const data = new FormData();

  data.append("chat", files[0]);

  fetch("http://localhost:3030/chats", {
    method: "POST",
    "Content-Type": "multipart/form-data",
    body: data,
  })
    .then(response => {
      response.json().then(m => {
        onSuccess(m.data);
      });
    })
    .catch(error => {
      onError(error);
    });
}

const Zone = styled(Dropzone)`
  border: 4px dashed #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;

  p {
    font-size: 24px;
  }
`;

const ZoneContainer = styled.div`
  width: 100%;
  padding: 20px 20px 30px;
`;

const ErrorMsg = styled.p`
  color: #e33;
`;

const Loading = styled.div`
  max-width: 500px;
  text-align: center;
`;

class ChatfileDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      error: null,
    };
  }

  onSuccess(response) {
    this.props.onAnalysisFinished(response);
    this.setState({ success: true, loading: false });
  }

  onStart(files) {
    this.setState({ success: false, error: null, loading: true });
  }

  onError(error) {
    this.setState({ error, loading: false });
  }

  render() {
    return (
      <ZoneContainer className={this.props.className}>
        <Zone
          onDrop={files =>
            onDropFile(
              files,
              this.onStart.bind(this),
              this.onSuccess.bind(this),
              this.onError.bind(this)
            )
          }>
          {this.state.loading &&
            !this.state.success &&
            !this.state.error && (
              <Loading>
                <p>
                  Crunching the data 🍤.<br />This can take a couple of seconds ⏳
                </p>
                <Spinner />
              </Loading>
            )}
          {!this.state.loading &&
            !this.state.success &&
            !this.state.error && <p>Drop 💧 a chat file 💬, or click anywhere in this box.</p>}
          {this.state.error && (
            <ErrorMsg>😭 Sorry, something went wrong, please try again.</ErrorMsg>
          )}
          {!this.state.loading &&
            this.state.success && (
              <ErrorMsg>
                🤔 We're still here, but couldn't find any messages.<br />Please try again with
                another file.
              </ErrorMsg>
            )}
        </Zone>
      </ZoneContainer>
    );
  }
}

export default ChatfileDrop;
