import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./HomeNavigation.scss";

const HomeNavigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="input-group">
        <Form.Control size="lg" type="text" placeholder="Room Code" />
        <Button variant="warning">Join</Button>
      </div>
      <div className="main">
        <Button variant="outline-warning" size="lg" onClick={handleShow}>
          Set up a room
        </Button>
      </div>
    </div>
  );
};

export default HomeNavigation;
