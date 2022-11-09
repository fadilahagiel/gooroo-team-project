import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ClassRow from "../components/ClassRow";
import Header from "../components/Header";
import { fetchContacts, fetchClasses } from "../store/actionCreator";
import socket from "../configs/socket";
import { Container } from 'react-bootstrap';

export default function MyTable() {
  const classes = useSelector((state) => state.classes)
  const dispatch = useDispatch()
  
  console.log(classes, "<<<< ini classes");

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchContacts()).then((data) => {
      console.log({ data });

      const user = {
        id: +data.userId,
        username: data.username,
        role: data.role,
        avatar: data.avatar,
      };

      console.log(user);
      localStorage.setItem("user", user);
      socket.auth = user;
      socket.connect();
    });
  }, []);

  console.log(classes, "<<CLASSES");
  return (
    <>
    <Container>
    <Header/>
    <br></br>
    <br></br>
    <Table striped bordered hover className={"table-dark"}>
      <thead style={{textAlign: "center"}}>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Subject Id</th>
          <th>Price</th>
          <th>Quota</th>
          <th>Average Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {classes.map((oneClass, i) => {
          return <ClassRow key={oneClass.id}oneClass={oneClass} index={i + 1}/>
          })}
      </tbody>
    </Table>
    </Container>
    </>
  );
}
