import React, { useRef, useEffect, useState } from "react";
import { Jumbotron, Row, Col, Container, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import UserInfoModal from "./UserInfoModal";
import "./Lobby.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandMiddleFinger } from "@fortawesome/free-solid-svg-icons";

const io = require("socket.io-client");

const Lobby = (props) => {
  const lobbyCode = useParams().lobby;
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [socketLoaded, setSocketLoaded] = useState(false);
  const socket = useRef();
  const [fuckOff, setFuckOff] = useState(false);

  const detailsEntered = useRef(false);

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.on("send-users", async (data) => {
      setUsers(data);
    });
    setSocketLoaded(true);
  }, []);

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

  const ShowUsers = () => {
    const userList = users.map((user, index) => {
      return (
        <Col>
          <div className="userBox text-center">
            <FontAwesomeIcon
              icon={faHandMiddleFinger}
              style={{ height: "100px", width: "100px", color: "purple" }}
            />
            <div>{user.name}</div>
          </div>
        </Col>
      );
    });
    console.log(userList);
    return <Row xs="4">{userList}</Row>;
  };

  return (
    <div>
      <ShowModal />
      <Jumbotron>
        <div className="display-5 text-center">Lobby Code:</div>
        <div className="display-4 text-center">{lobbyCode}</div>
      </Jumbotron>
      <Container>
        <ShowUsers></ShowUsers>
        <div className="text-center" style={{ paddingTop: "20px" }}>
          <Button size="lg" block onClick={() => setFuckOff(!fuckOff)}>
            GO!
          </Button>
        </div>
      </Container>
      {fuckOff && (
        <div className="display-1 text-center">
          FUCK OFF JOE
          <FontAwesomeIcon
            icon={faHandMiddleFinger}
            style={{ height: "100px", width: "100px", color: "purple" }}
          />
        </div>
      )}
    </div>
  );
};

export default Lobby;
