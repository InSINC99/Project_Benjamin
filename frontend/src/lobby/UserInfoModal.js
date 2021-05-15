import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const UserInfoModal = (props) => {
  const [name, setName] = useState("");
  const socket = props.socket;

  const handleSubmit = (event) => {
    socket.emit("join-lobby", { name: name, lobbyCode: props.lobbyCode });
    props.setName(name);
    event.preventDefault();
    props.onHide();
  };

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button block type="submit">
            Done
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserInfoModal;
