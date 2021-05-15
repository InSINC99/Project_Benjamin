import React, { useState } from "react";
import { Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import "./HomeNavigation.scss";
import CreateRoomModal from "./CreateLobbyModal";
import { useHistory } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:4000";

const HomeNavigation = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [lobbyCode, setLobbyCode] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    setValidated(true);

    axios.get(url + `/lobbies/${lobbyCode}`).then((res) => {
      if (res.status === 200) {
        if (res.data.error) {
          return console.log(res.data.error);
        }

        history.push({
          pathname: `/lobby/${lobbyCode}`,
          state: {
            isOwner: false,
          },
        });
        history.go();
      }
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <CreateRoomModal show={show} onHide={() => setShow(false)} />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <InputGroup hasValidation>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Lobby Code"
            required
            onChange={(e) => {
              setLobbyCode(e.target.value);
            }}
          />
        </InputGroup>
        <Button variant="outline-info" type="submit">
          Join
        </Button>
      </Form>
      <div className="main">
        <Button variant="outline-info" size="lg" onClick={handleShow}>
          Set up a lobby
        </Button>
      </div>
    </Container>
  );
};

export default HomeNavigation;
