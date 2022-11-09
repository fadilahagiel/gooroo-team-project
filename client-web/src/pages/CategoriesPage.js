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
      <Button
        className="btn-success mb-3"
        onClick={addCategoryButton}>
        Add Category
      </Button>
      <Table
        striped
        bordered
        hover
        className={"table-dark"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
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
    </>
  );
}
