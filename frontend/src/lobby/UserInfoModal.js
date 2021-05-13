import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import InputSpinner from "react-bootstrap-input-spinner";
import { useHistory } from "react-router-dom";
const axios = require("axios");
const url = "http://localhost:4000";

const UserInfoModal = (props) => {
  const [name, setName] = useState("");
  const socket = props.socket;

  const handleSubmit = (event) => {
    props.setName(name);

    socket.emit("join-lobby", { name: name, lobbyCode: props.lobbyCode });

    props.onHide();
    event.preventDefault();
  };

  return (
    <Modal
      {...props}
      size="sm"
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
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserInfoModal;
