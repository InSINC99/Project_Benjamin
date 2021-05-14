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

let lobbies = {};
// logic for creating a room -
io.on("connection", (socket) => {
  let lobbyCode = "";
  console.log(socket.id + " has connected");

  socket.on("join-lobby", (data) => {
    lobbyCode = data.lobbyCode;
    if (lobbies[data.lobbyCode] === undefined) {
      return;
    }
    lobbies[data.lobbyCode][socket.id] = { name: data.name };
    console.log(lobbies[lobbyCode]);
    let dataToSend = [];
    Object.values(lobbies[lobbyCode]).forEach((user) => {
      dataToSend.push(user);
    });
    console.log("DATA TO SEND");
    console.log(dataToSend);

    socket.emit("send-users", dataToSend);
  });
});

app.post("/create-lobby", (req, res) => {
  console.log(req.body);
  let lobbyCode = createLobbyCode();
  lobbies[lobbyCode] = {};

  return res.status(200).send({ lobbyCode: lobbyCode });
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

const createLobbyCode = () => {
  let opt = { min: 65, max: 90, integer: true };
  let lobbyCode = "";
  for (i = 0; i < 4; i++) {
    let num = random(opt);
    lobbyCode += String.fromCharCode(num);
  }
  return lobbyCode;
};
