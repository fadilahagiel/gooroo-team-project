import Image from "react-bootstrap/Image";
import { deleteClass, fetchClasses } from "../store/actionCreator";
import { updateClass } from "../store/actionCreator";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ClassRow({ oneClass, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClassButton = (e) => {
    e.preventDefault();
    console.log(oneClass.id);
    dispatch(deleteClass(oneClass.id)).then(() => {
      navigate("/");
      dispatch(fetchClasses());
    });
  };
  const updateClassButton = (e) => {
    e.preventDefault();

    navigate("/edit/" + oneClass.id);
  };

  const formatPrice = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(oneClass.price);
  };

  return (
    <tr className="align-middle text-center">
      <td>{index}</td>
      <td>{oneClass.name}</td>
      <td>{oneClass.Subject.name}</td>
      <td>{formatPrice(oneClass.price)}</td>
      <td>{oneClass.quota}</td>
      <td>{oneClass.averageRating}</td>
      <td style={{ maxWidth: "100px" }}>
        <Button
          onClick={() => navigate(`/class/${oneClass.id}`)}
          className={"btn-sm m-2"}
        >
          Details
        </Button>
        <Button
          onClick={() => navigate(`/edit-class/${oneClass.id}`)}
          className={"btn-sm btn-success m-2"}
        >
          Update
        </Button>
        <Button onClick={deleteClassButton} className={"btn-sm btn-danger m-2"}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
