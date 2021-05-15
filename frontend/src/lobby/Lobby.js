import React, { useRef, useEffect, useState } from "react";
import { Jumbotron, Row, Col, Container, Button, Modal } from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import UserInfoModal from "./UserInfoModal";
import "./Lobby.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandMiddleFinger } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const io = require("socket.io-client");
const _ = require("lodash");

const Lobby = (props) => {
  const lobbyCode = useParams().lobby;
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [socketLoaded, setSocketLoaded] = useState(false);
  const location = useLocation();

  const socket = useRef();
  const isOwner = useRef();
  const detailsEntered = useRef(false);

  useEffect(() => {
    if (location.state.isOwner === undefined) {
      return;
    }
    socket.current = io("http://localhost:4000");
    socket.current.on("send-users", (data) => {
      //Sort users by isOwner property so that the owner is at the front
      const sortedData = _.sortBy(data, (o) => o.isOwner).reverse();
      setUsers(sortedData);
    });
    isOwner.current = location.state.isOwner;

    //Sets socket loaded to true so that modal doesnt load until socket has finished establishing
    setSocketLoaded(true);
  }, [location]);

  useEffect(() => {
    if (name === "" || isOwner.current === undefined) {
      return;
    }
    socket.current.emit("join-lobby", {
      name: name,
      lobbyCode: lobbyCode,
      isOwner: isOwner.current,
    });
  }, [name]);

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
              className="picture"
              style={{ width: "10vw", height: "10vh" }}
            />
            <div>
              {user.isOwner && (
                <FontAwesomeIcon
                  icon={faCrown}
                  style={{ width: "2vw", height: "2vh", color: "gold" }}
                />
              )}
              {user.name}
            </div>
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
          <Button
            size="lg"
            variant="info"
            block
            onClick={() => {
              console.log(users);
            }}
          >
            GO!
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Lobby;
