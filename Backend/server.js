//Imports
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

//Using imports
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Global data structure for storing lobbies
let lobbies = {};

//On a socket IO connection (new client joining), following code will execute
io.on("connection", (socket) => {
  let lobbyCode = "";
  console.log(socket.id + " has connected");

  //Listen for a 'join-lobby' event
  socket.on("join-lobby", (data) => {
    if (lobbies[data.lobbyCode] === undefined) {
      return;
    }

    //Set lobbyCode so that further events can know the lobby code without having to be sent it
    lobbyCode = data.lobbyCode;

    //Join the current socket into the room, so that we can later use socket.IO broadcast function to broadcast specifically to that lobby
    socket.join(lobbyCode);

    //Add user into the lobby
    lobbies[data.lobbyCode].users[socket.id] = {
      name: data.name,
      isOwner: data.isOwner,
    };

    //Gather the members currently in a lobby to emit to everyone in the lobby
    let dataToSend = getAllUsersInLobby(lobbyCode);

    io.to(lobbyCode).emit("send-users", dataToSend);
    console.log(lobbies);
  });

  //Listen for a 'disconnect' event
  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    if (lobbies[lobbyCode] === undefined) {
      return;
    }

    //Delete the user from the lobby
    delete lobbies[lobbyCode].users[socket.id];

    let dataToSend = getAllUsersInLobby(lobbyCode);
    io.to(lobbyCode).emit("send-users", dataToSend);
  });

  /**
   *
   * @param {Lobby Code} lobby
   * @returns All the current users in a lobby
   */
  const getAllUsersInLobby = (lobby) => {
    let data = [];
    Object.values(lobbies[lobby].users).forEach((user) => {
      data.push(user);
    });

    return data;
  };
});

/**
 * Creates a lobby
 */
app.post("/create-lobby", (req, res) => {
  let lobbyCode = createLobbyCode();
  console.log(req.body);
  lobbies[lobbyCode] = {
    properties: req.body,
    users: {},
  };

  return res.status(200).send({ lobbyCode: lobbyCode });
});

/**
 * Returns information about a lobby
 */
app.get("/lobbies/:lobbyCode", (req, res) => {
  const lobbyCode = req.params.lobbyCode;
  console.log(lobbies.hasOwnProperty(lobbyCode));
  if (lobbies.hasOwnProperty(lobbyCode)) {
    return res.sendStatus(200);
  }
  return res.status(200).send({ error: "Lobby does not exist" });
});

/**
 * Runs the server on a given port
 */
http.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

/**
 *
 * @returns some garbage joe wrote
 */
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

/**
 *
 * @returns A 4 letter room code
 */
const createLobbyCode = () => {
  let opt = { min: 65, max: 90, integer: true };
  let lobbyCode = "";
  for (i = 0; i < 4; i++) {
    let num = random(opt);
    lobbyCode += String.fromCharCode(num);
  }
  return lobbyCode;
};
