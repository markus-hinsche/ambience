import React, { Component } from "react";
import Dropzone from "react-dropzone";

function onDropFile(files) {
  const data = new FormData();

  data.append("chat", files[0]);

  fetch("http://localhost:3030/chats", {
    method: "POST",
    "Content-Type": "multipart/form-data",
    body: data,
  }).then(response => {
    response.json().then(m => console.log(m));
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ambience</h1>
        </header>
        <p className="App-intro">To get started, drop a text file.</p>

        <Dropzone onDrop={onDropFile} />
      </div>
    );
  }
}

export default App;
