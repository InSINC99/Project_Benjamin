import React, { useRef, useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import UserInfoModal from "./UserInfoModal";

const io = require("socket.io-client");

const Lobby = (props) => {
  const lobbyCode = useParams().lobby;
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [socketLoaded, setSocketLoaded] = useState(false);

  const socket = useRef();
  const detailsEntered = useRef(false);

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.on("get-users", {});
    setSocketLoaded(true);
  }, [socket]);

  const ShowModal = () => {
    if (detailsEntered.current) {
      return null;
    }
    if (!socketLoaded) {
      return null;
    }

    return (
      <UserInfoModal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        setName={setName}
        onExit={(e) => {
          if (name === "") {
            setShow(true);
          }
        }}
        socket={socket.current}
        lobbyCode={lobbyCode}
      />
    );
  };

  return (
    <div>
      <ShowModal />
      <Jumbotron>
        <div className="display-5 text-center">Lobby Code:</div>
        <div className="display-4 text-center">{lobbyCode}</div>
      </Jumbotron>
      <button
        onClick={() => {
          console.log(name);
        }}
      >
        Show name
      </button>
    </div>
  );
};

export default Lobby;
