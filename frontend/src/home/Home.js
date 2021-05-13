import React, { useState, useRef, useEffect } from "react";
import HomeNavigation from "./HomeNavigation";
import "./Home.scss";

//remove later
const io = require("socket.io-client");

const Home = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.emit("join_room");
  }, []);

  return (
    <div>
      <div className="centered text-center box">
        <h1 className="display-3" style={{ paddingBottom: "40px" }}>
          Project Benjamin
        </h1>
        <div>
          <HomeNavigation></HomeNavigation>
        </div>
      </div>
    </div>
  );
};

export default Home;
