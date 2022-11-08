import Image from 'react-bootstrap/Image'
import {deleteClass, fetchClasses} from "../store/actionCreator"
import {updateClass} from "../store/actionCreator"
import Button from 'react-bootstrap/Button';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function ClassRow 
({oneClass, index}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClassButton = (e) => {
    e.preventDefault();
    console.log(oneClass.id);
    dispatch(deleteClass(oneClass.id))
    .then(() => {
      navigate('/'); 
        dispatch(fetchClasses())})
    
  }
  const updateClassButton = (e) => {
    e.preventDefault();

    navigate('/edit/' + oneClass.id)
  }

  const formatPrice = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(oneClass.price);
  }
    
    return(
        <tr className="align-middle text-center">
        <td>{index}</td>
        <td>{oneClass.name}</td>
        <td>{oneClass.SubjectId}</td>
        <td>{formatPrice(oneClass.price)}</td>
        <td>{oneClass.quota}</td>
        <td>{oneClass.averageRating}</td>
        <td>
          <Button onClick={deleteClassButton} className={"btn-sm btn-danger"}>Delete</Button>
          <Button onClick={updateClassButton} className={"btn-sm btn-success"}>Update</Button>
          <Button onClick={() => navigate(`/class/${oneClass.id}`)} className={"btn-sm"}>Details</Button>
        </td>
      </tr>
    )
}