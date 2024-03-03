const express = require("express");
const app = express();
const port = 3300;
const cors = require("cors");
const fs = require("fs");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Dodaj tę linię
io.on("connection", (socket) => {
  console.log("a user connected");
});
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  fs.readFile("chat.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/add", (req, res) => {
  fs.readFile("chat.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let chat = JSON.parse(data);
      if (Array.isArray(chat)) {
        let newChat = req.body;
        newChat.id = chat.length + 1; // Użyj długości tablicy + 1 jako ID
        chat.push(newChat);
        fs.writeFile("chat.json", JSON.stringify(chat), (err) => {
          if (err) {
            console.log(err);
          } else {
            io.emit("chat update", newChat);
            res.send("Chat added");
          }
        });
      } else {
        console.log("Error: chat is not an array");
      }
    }
  });
});

server.listen(port, () => {
  // Zmodyfikuj tę linię
  console.log(`Server is running on port ${port}`);
});
