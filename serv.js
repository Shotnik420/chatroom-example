const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.post("/", (req, res) => {
  var data = req.body;
  fs.appendFile("imiona.txt", data.imie + "\n", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data added to imiona.txt");
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
