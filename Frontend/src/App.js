import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/login-page";
import HomePage from "./Components/home-page";
import RegistrationPage from "./Components/registration-page";
import "./Components/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="#">TASK APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/signup-page" exact element={<RegistrationPage />} />
          <Route path="/:user_id" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
