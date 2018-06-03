const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");

// Initialization
const app = express();
const upload = multer({});

app.use(cors());

function matchWhatsappChat(content) {
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
  const matches = matchWhatsappChat(content);

  console.log(matches);
}

// Routes
app.post("/chats", upload.single("chat"), function(req, res, next) {
  const { file } = req;
  // req.body will hold the text fields, if there were any

  parseFile(file);

  res.json({
    message: "success",
  });
});

// Start server
app.listen(3030, () => console.log("Backend listening on 3030!"));
