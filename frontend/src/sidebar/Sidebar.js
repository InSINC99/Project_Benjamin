import React from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandMiddleFinger } from "@fortawesome/free-solid-svg-icons";

const SidebarComponent = () => {
  return (
    <Sidebar.Pushable as={Segment} style={{ height: "100vh" }}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
      >
        <Menu.Item as="a">
          <FontAwesomeIcon
            icon={faHandMiddleFinger}
            style={{ height: "100px", width: "100px", color: "white" }}
          />
          Create Room
        </Menu.Item>
      </Sidebar>
    </Sidebar.Pushable>
  );
};

export default SidebarComponent;
