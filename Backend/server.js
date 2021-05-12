var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
const random = require("random-number");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const httpServer = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const options = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
};
const port = 4000;

const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  console.log(socket);

  socket.on("hello", () => {
    roomCode = createRoomCode();
    console.log(roomCode);
    socket.join(roomCode);
  });
});

let rooms = {};

app.post("/create-room-info", (req, res) => {
  console.log(req.body);
  return res.status(200).send(room_info);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// function storeRoomCredentials(packet){

//     MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Project_Benjamin");

//     dbo.collection("roomInfo").insertOne(packet, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
//     });
//     return "Success"

// }

const createRoomCode = () => {
  let opt = { min: 65, max: 90, integer: true };
  let roomCode = "";
  for (i = 0; i < 4; i++) {
    let num = random(opt);
    roomCode += String.fromCharCode(num);
  }
};
