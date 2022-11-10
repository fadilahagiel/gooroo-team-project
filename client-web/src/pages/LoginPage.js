import {Container, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { fetchContacts, login } from "../store/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import socket from "../configs/socket";
import "../App.css";

function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(loginForm);
    dispatch(login(loginForm)).then(() => {
      navigate("/");
      dispatch(fetchContacts()).then((user) => {
        console.log("user di homepage", user);
        socket.auth = user;
        socket.connect();
      });
      Swal.fire("Success Login!", "", "success");
    });
  };
  return (
    <>
    <Container
    style={{
          flex: "1",
          width: "60%",
          height: "100%",
          marginTop: "",
          paddingBottom: "10vh",
          textAlign: "center",
          borderRadius: "5%",
        }}>
      <div className="loginBox" style={{height: "100%"}}>
        <div className="sub-loginBox">
          <Form style={{ width: "60%", margin: "auto" }} onSubmit={submitLogin}>
            <h1 className="mt-3 mb-5" style={{ textAlign: "center" }}>
              Login Form
            </h1>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email.."
                onChange={(e) => {
                  console.log(e.target.value);
                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password.."
                onChange={(e) => {
                  console.log(e.target.value);
                  setLoginForm({
                    ...loginForm,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <br></br>

            <Button
              type="submit"
              style={{
                align: "center",
                backgroundColor: "#98E661",
                color: "navy",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
      </Container>
    </>
  );
}

export default LoginPage;
