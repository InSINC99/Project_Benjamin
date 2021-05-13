const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000 || process.env;
const random = require("random-number");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let rooms = {};
// logic for creating a room -
io.on("connection", (socket) => {
  socket.on("join_room", () => {
    let roomCode = createRoomCode();
    rooms[roomCode] = {};

    if (rooms.hasOwnProperty(roomCode)) {
      rooms[roomCode][socket.id] = "member";
      console.log(roomCode);
      console.log(rooms);
      socket.join(roomCode);
    }
  });
});

app.post("/create-room-info", (req, res) => {
  let roomCode = createRoomCode();
  rooms[roomCode] = {};

  return res.status(200).send(roomCode);
});

http.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
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
  return roomCode;
};
