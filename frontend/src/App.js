import logo from "./logo.svg";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "semantic-ui-css/semantic.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { Button } from "react-bootstrap";
import Home from "./home/Home";
import Lobby from "./lobby/Lobby";
import SidebarComponent from "./sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "./404/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/lobby/:lobby">
            <Lobby></Lobby>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
