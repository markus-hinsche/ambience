const express = require("express");
const multer = require("multer");
const cors = require("cors");

// Initialization
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Functions
function parseFile(file) {
  //TODO: Parse file and send to
  console.log(file);
}

// Routes
app.post("/chats", upload.single("chat"), function(req, res, next) {
  const { file } = req;
  // req.body will hold the text fields, if there were any

  parseFile(file);

  res.json({
    message: "success"
  });
});

// Start server
app.listen(3030, () => console.log("Backend listening on 3030!"));
