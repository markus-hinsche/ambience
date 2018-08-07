import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import Spinner from "./Spinner";
import Disclaimer from "./Disclaimer";

import { BASE_URL } from "../environment";

function onDropFile(files, onStart, onSuccess, onError) {
  onStart();

  const data = new FormData();

  data.append("chat", files[0]);

  fetch(`${BASE_URL}/chats`, {
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
`;

const ZoneContainer = styled.div`
  width: 100%;
  padding: 20px 20px 50px;
`;

const Msg = styled.p`
  font-size: 24px;
`;

const ErrorMsg = styled(Msg)`
  color: #e33;
`;

const Loading = styled.div`
  max-width: 500px;
  text-align: center;
  padding: 50px;
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
                <Msg>
                  Crunching the data{" "}
                  <span role="img" aria-label="crunch">
                    🍤
                  </span>.<br />This can take a couple of seconds ⏳
                </Msg>
                <Spinner />
              </Loading>
            )}
          {!this.state.loading && !this.state.success && !this.state.error && <Disclaimer />}
          {this.state.error && (
            <ErrorMsg><span role="img" aria-label="cry">😭</span> Sorry, something went wrong, please try again.</ErrorMsg>
          )}
          {!this.state.loading &&
            this.state.success && (
              <ErrorMsg>
                <span role="img" aria-label="hmm">🤔</span> We're still here, but couldn't find any messages.<br />Please try again with
                another file.
              </ErrorMsg>
            )}
        </Zone>
      </ZoneContainer>
    );
  }
}

export default ChatfileDrop;
