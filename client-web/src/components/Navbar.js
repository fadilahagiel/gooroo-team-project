import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actionCreator";
import Swal from "sweetalert2";
import socket from "../configs/socket";

export default function MyNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/welcome");
    Swal.fire(
      "Success Logout!",
      "Thank you for using our services!",
      "success"
    );
    socket.disconnect();
  };

  return (
    <Navbar
      variant="dark"
      expand="lg"
      style={{
        fontFamily: "monospace",
        backgroundColor: "#090B48",
        paddingRight: "40px",
      }}
    >
      {/* <Container> */}
      <Navbar.Brand href="/">
        <img
          className="img-fluid"
          style={{ width: "200px" }}
          src="/GooRoo_LOGO3.png"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to="/"
          >
            Home
          </Link>
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to={"add-class"}
          >
            Add Class
          </Link>
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to={"categories"}
          >
            Subjects
          </Link>
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to={"teacher-profile"}
          >
            My Profile
          </Link>
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to={"chat"}
          >
            Messages
          </Link>
          <Link
            className={"m-3"}
            style={{ color: "white", fontSize: "20px" }}
            to={"register"}
          >
            Teacher Registration
          </Link>
        </Nav>
        <Button
          className={"btn-danger"}
          style={{ backgroundColor: "#A41313" }}
          onClick={submitLogout}
        >
          Logout{" "}
        </Button>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}
