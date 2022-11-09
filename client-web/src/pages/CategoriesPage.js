import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

import CategoryRow from "../components/CategoryRow";
import { useNavigate } from "react-router-dom";

import { subjects } from "../assets/subject";

export default function MyTable2() {
  const navigate = useNavigate();
  const addCategoryButton = (e) => {
    e.preventDefault();
    navigate("/category");
  };

  return (
    <>
      <div style={{height: '80vh'}}>
        <br></br>
        <br></br>
        <br></br>
        <h2 style={{textAlign:'center'}}>Subjects List</h2>
      <Table
        striped
        bordered
        hover
        className={"table-dark"} style={{width: '50%', marginLeft:'25%'}}>
        <thead style={{marginTop:'10%'}}>
          <tr style={{textAlign: 'center'}}>
            <th>#</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((category, i) => {
            return (
              <CategoryRow
                key={category.id}
                category={category}
                index={i + 1}
              />
            );
          })}
        </tbody>
      </Table>
      </div>
    </>
  );
}
