import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./HomeNavigation.scss";
import CreateRoomModal from "./CreateLobbyModal";

const HomeNavigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <CreateRoomModal show={show} onHide={() => setShow(false)} />
      <div className="input-group">
        <Form.Control size="lg" type="text" placeholder="Lobby Code" />
        <Button variant="outline-info">Join</Button>
      </div>
      <div className="main">
        <Button variant="outline-info" size="lg" onClick={handleShow}>
          Set up a lobby
        </Button>
      </div>
    </div>
  );
};

export default HomeNavigation;
