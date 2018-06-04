import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

function onDropFile(files, action) {
  const data = new FormData();

  data.append("chat", files[0]);

  fetch("http://localhost:3030/chats", {
    method: "POST",
    "Content-Type": "multipart/form-data",
    body: data,
  }).then(response => {
    response.json().then(m => {
      action(m.data);
    });
  });
}

const Zone = styled(Dropzone)`
  border: 4px dashed #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
`;

const ZoneContainer = styled.div`
  width: 100%;
  padding: 20px 20px 30px;
`;

class ChatfileDrop extends Component {
  render() {
    return (
      <ZoneContainer className={this.props.className}>
        <Zone onDrop={files => onDropFile(files, this.props.onAnalysisFinished)}>
          <p>Drop a chat file, or click here</p>
        </Zone>
      </ZoneContainer>
    );
  }
}

export default ChatfileDrop;
