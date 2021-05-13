import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import InputSpinner from "react-bootstrap-input-spinner";
import "./CreateLobbyModal.scss";
const axios = require("axios");
const url = "http://localhost:4000";

const CreateLobbyModal = (props) => {
  const [radius, setRadius] = useState(5);
  const [lobbySize, setLobbySize] = useState(4);
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (event) => {
    console.log("HI");
    event.preventDefault();
    console.log(lobbySize);
    console.log(postcode);
    console.log(radius);
    axios
      .post(url + "/create-lobby", {
        postcode: postcode,
        lobbySize: lobbySize,
        radius: radius,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("SUCCESS");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a lobby
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postcode">
            <Form.Label>Postcode:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postcode">
            <Form.Label>Radius:</Form.Label>
            <Form.Group as={Row}>
              <Col xs="3">
                <Form.Control value={radius + " miles"} disabled />
              </Col>
              <Col xs="9">
                <RangeSlider
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  min={1}
                  max={20}
                  tooltipLabel={(radius) => `${radius} miles`}
                  variant="info"
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="lobbysize">
              <Form.Label>Lobby Size:</Form.Label>
              <InputSpinner
                type={"number"}
                max={12}
                min={3}
                value={lobbySize}
                onChange={(num) => setLobbySize(num)}
                size="sm"
                variant="info"
              />
            </Form.Group>
          </Form.Group>
          <div className="text-center">
            <Button variant="info" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateLobbyModal;
