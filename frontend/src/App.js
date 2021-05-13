import logo from "./logo.svg";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "semantic-ui-css/semantic.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { Button } from "react-bootstrap";
import Home from "./home/Home";
import SidebarComponent from "./sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <SidebarComponent></SidebarComponent>
      <Home></Home>
    </div>
  );
}

export default App;
