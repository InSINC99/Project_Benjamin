import React from "react";
import HomeNavigation from "./HomeNavigation";
import "./Home.scss";

//remove later

const Home = () => {
  return (
    <div>
      <div className="centered text-center box">
        <h1 className="display-3 title">Project Benjamin</h1>
        <div>
          <HomeNavigation></HomeNavigation>
        </div>
      </div>
    </div>
  );
};

export default Home;
