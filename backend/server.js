const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const axios = require("axios");

// Initialization
const app = express();
const upload = multer({});

app.use(cors());

function flatmap(arr, mapFn) {
  return arr.map(mapFn).reduce((all, r) => [...all, ...r], []);
}

function getWhatsappMessages(content) {
  return content
    .split("\n")
    .map(line => {
      const match = line.match(/(?<time>[0-9\/, :AMP]+) \- (?<name>[a-zA-Z ]+): (?<text>.+)/);

      return match ? match.groups : null;
    })
    .filter(line => !!line);
}

function parseFile(file) {
  const content = file.buffer.toString("utf8");

  return getWhatsappMessages(content);
}

function bucketizeMessages(messages, bucketSize) {
  let a = [];

  for (var i = 0; i < messages.length; i += bucketSize) {
    a.push(messages.slice(i, i + bucketSize));
  }

  return a;
}

function mapMessageToRasaCall(message) {
  return axios
    .post("http://localhost:5000/parse", JSON.stringify({ q: message.text }))
    .then(response => ({
      ...message,
      intent: response.data.intent.name,
      confidence: response.data.intent.confidence,
    }));
}

async function askRasa(messages) {
  const buckets = bucketizeMessages(messages, 20);

  const results = await buckets.reduce((all, messagesBucket, i) => {
    return all.then(result => {
      console.log(`Sending messagesBucket number ${i}`);

      return Promise.all(messagesBucket.map(mapMessageToRasaCall)).then(responses =>
        result.concat(responses)
      );
    });
  }, Promise.resolve([]));

  return results;
}

// Routes
app.post("/chats", upload.single("chat"), async function(req, res, next) {
  const { file } = req;
  // req.body will hold the text fields, if there were any

  const matches = parseFile(file);

  try {
    const messages = await askRasa(matches);

    res.json({
      message: "success",
      data: messages,
    });
  } catch (e) {
    console.error(e);
  }
});

// Start server
app.listen(3030, () => console.log("Backend listening on 3030!"));
