import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import ProductRow from "../components/ClassRow";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function StudentProfile({ open,onClose }) {
  const navigate = useNavigate();

  if (!open) return null;
  return (
    <>
      <div className="overlay">
        <Container
          style={{
            display: "flex",
            marginTop: "30px",
            height: "100%",
            paddingBottom: "5vh",
            textAlign: "center",
            backgroundColor: "#B7CCF0",
            borderRadius: "5%",
            color: "rgba(0,0,0,1)",
          }}
          className='modalContainer'
        >
          <Container
            style={{
              flex: "5",
              textAlign: "center",
              padding: "10%",
              paddingBottom: "5vh",
              height: "100%",
              borderRadius: "5%",
            }}
          >
            <h3 style={{right: '0px'}} onClick={onClose} className='closeBtn'>x</h3>
            <img
              src="https://img.freepik.com/free-photo/happy-young-female-student-holding-notebooks-from-courses-smiling-camera-standing-spring-clothes-against-blue-background_1258-70161.jpg?w=2000"
              style={{
                maxWidth: "50%",
                borderRadius: "200px",
              }}
            />
            <h1>Student's Name</h1>
            <h3 style={{ }}>Email</h3>
            <Button
              style={{
                height: "50px",
                width: "80px",
                backgroundColor: "#98E661",
                color: "navy",
                fontSize: "15px",
              }}
              onClick={() => navigate("/chat")}
            >
              Chat
            </Button>
          </Container>
        </Container>
      </div>
    </>
  );
}
