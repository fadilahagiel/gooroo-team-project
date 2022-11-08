import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import CategoryRow from '../components/CategoryRow';
import {fetchCategory} from '../store/actionCreator'
import { useNavigate } from 'react-router-dom';
import {createCategory} from "../store/actionCreator"


export default function MyTable2() {
  const categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const addCategoryButton = (e) => {
    e.preventDefault();
    navigate('/category')
  }

  useEffect(()=> {
    dispatch(fetchCategory())
  },[])
  console.log(categories);
  return (
    <>
    <Button className="btn-success mb-3" onClick={addCategoryButton}>Add Category</Button>
    <Table striped bordered hover className={"table-dark"}>
      <thead>
        <tr>
          <th>#</th>
          <th>Category Name</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, i) => {
          return <CategoryRow key={category.id}category={category} index={i + 1}/>
          })}
      </tbody>
    </Table>
    </>
  );
}