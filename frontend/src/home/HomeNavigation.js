import React from "react";
import { Form, Button } from "react-bootstrap";
import "./HomeNavigation.scss";

const HomeNavigation = () => {
  return (
    <div>
      <div className="input-group">
        <Form.Control size="lg" type="text" placeholder="Room Code" />
        <Button variant="warning">Join</Button>
      </div>
      <div className="main">
        <Button variant="outline-warning" size="lg">
          Create
        </Button>
      </div>
    </div>
  );
};

export default HomeNavigation;
