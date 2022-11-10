import { Container, Row, Col, Table, Button } from "react-bootstrap";
import StudentRow from "../components/StudentRow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOneClass, fetchOneClassStudents } from "../store/actionCreator";
import { useParams } from "react-router-dom";
import StudentProfile from "./StudentProfile";

export default function ClassDetail() {
  const navigate = useNavigate();
  const oneClass = useSelector((state) => state.oneClass);
  const oneClassStudents = useSelector((state) => state.oneClassStudents)


  // const teacher = useSelector((state) => state.oneClass.Teacher)
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [openModal, setOpenModal] = useState(false)

  console.log(oneClass, id, "<<<ONE CLASS");

  useEffect(() => {
    dispatch(fetchOneClass(id));
  }, []);
  useEffect(() => {
    dispatch(fetchOneClassStudents(id));
  }, []);

  return (
    <>
      <Container
        style={{ display: "flex", height: "100vh" }}
      >
        <Container
          style={{
            backgroundColor: "red",
            flex: "2",
            textAlign: "center",
            paddingTop: "15%",
            borderStartStartRadius: "20px",
            backgroundColor: "rgba(9, 11, 72, 0.5)",
          }}
        >
          <img
            src={oneClass.Teacher?.image}
            style={{
              marginBottom: "10px",
              maxHeight: "30%",
              borderRadius: "5%",
            }}
          />
          <h2>{oneClass.Teacher?.fullName}</h2>
        </Container>
        <Container
          style={{
            backgroundColor: "rgba(9, 11, 72, 0.1)",
            flex: "5",
            textAlign: "center",
            padding: "10%",
            borderStartEndRadius: "20px",
          }}
        >
          <h1>{oneClass.name}</h1>
          <h4 style={{ marginTop: "100px", textJustify: "" }}>
            {oneClass.description}
          </h4>
          <h1 style={{ marginTop: "50px" }}>
            Rating: {oneClass.averageRating}
          </h1>
          <h1 style={{ marginTop: "50px" }}>Quota: {oneClass.quota}</h1>
          
        </Container>
      </Container>
    </>
  );
}
