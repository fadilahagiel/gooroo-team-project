import Image from "react-bootstrap/Image";
import { deleteClass, fetchClasses } from "../store/actionCreator";
import { updateClass } from "../store/actionCreator";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function StudentRow({ oneClassStudents, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const deleteClassButton = (e) => {
  //     e.preventDefault();
  //     console.log(oneClass.id);
  //     dispatch(deleteClass(oneClass.id)).then(() => {
  //       navigate("/");
  //       dispatch(fetchClasses());
  //     });
  //   };

  return (
    <tr className="align-middle text-center">
      <td>{index}</td>
      <td>{oneClassStudents.fullName}</td>
      <td style={{ maxWidth: "100px" }}>
        <Button onClick={() => navigate(`/chat`)} className={"btn-sm m-2"}>
          Chat
        </Button>
      </td>
    </tr>
  );
}
