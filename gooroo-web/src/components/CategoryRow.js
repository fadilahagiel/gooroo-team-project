import {deleteCategory} from "../store/actionCreator"
import {updateProduct} from "../store/actionCreator"
import Button from 'react-bootstrap/Button';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchCategory} from '../store/actionCreator'
import Swal from 'sweetalert2'

export default function CategoryRow 
({category, index}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCategoryButton = (e) => {
    e.preventDefault();
    console.log(category.id);
    dispatch(deleteCategory(category.id))
    .then(() => {
      navigate('/categories');
      Swal.fire(
        'Success Delete Category!',
        '',
        'success'
      ) 
        dispatch(fetchCategory())
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:  err.name,
        });
      })
    
  }
  // const updateCategoryButton = (e) => {
  //   e.preventDefault();

  //   navigate('/categories')
  // }
    return(
        <tr className="align-middle text-center">
        <td>{index}</td>
        <td>{category.name}</td>
        <td>{category.createdAt}</td>
        <td>{category.updatedAt}</td>
        <td>
          <Button onClick={deleteCategoryButton} className={"btn btn-danger"}>Delete</Button>
          {/* <Button onClick={updateCategoryButton} className={"btn btn-success"}>Update</Button> */}
        </td>
      </tr>
    )
}