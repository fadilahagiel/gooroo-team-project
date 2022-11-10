import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ClassRow from "../components/ClassRow";
import Header from "../components/Header";
import { fetchClasses } from "../store/actionCreator";
import { Container } from "react-bootstrap";

export default function MyTable() {
  const classes = useSelector((state) => state.classes);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
  }, []);

  console.log(classes, "<<CLASSES");
  return (
    <>
      <Container style={{ paddingTop: "50px" }}>
        <Header />
        <br></br>
        <br></br>
        <Table striped bordered hover className={"table-dark"}>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Price</th>
              <th>Quota</th>
              <th>Average Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((oneClass, i) => {
              return (
                <ClassRow key={oneClass.id} oneClass={oneClass} index={i + 1} />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
