const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const axios = require("axios");

// Initialization
const app = express();
const upload = multer({});

app.use(cors());

function getWhatsappMessages(content) {
  return content
    .split("\n")
    .map(line => {
      const match = line.match(/(?<time>[0-9\/, :AMP]+) \- (?<name>[a-zA-Z ]+): (?<text>.+)/);

      return match ? match.groups : null;
    })
    .filter(line => !!line);
}

// Functions
function parseFile(file) {
  //TODO: Parse file and send to

  const content = file.buffer.toString("utf8");

  return getWhatsappMessages(content);
}

function askRasa(messages) {
  return Promise.all(
    messages.map(message => {
      return axios
        .post("http://localhost:5000/parse", JSON.stringify({ q: message.text }))
        .then(response => ({
          ...message,
          intent: response.data.intent.name,
          confidence: response.data.intent.confidence,
        }));
    })
  );
}

// Routes
app.post("/chats", upload.single("chat"), function(req, res, next) {
  const { file } = req;
  // req.body will hold the text fields, if there were any

  const matches = parseFile(file);

  askRasa(matches).then(messages => {
    res.json({
      message: "success",
      data: messages,
    });
  });
});

// Start server
app.listen(3030, () => console.log("Backend listening on 3030!"));
