import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import ProductRow from '../components/ProductRow';
import Header from '../components/Header'
import {fetchProducts} from '../store/actionCreator'

export default function MyTable() {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  
  console.log(products, "<<<< ini products");

  useEffect(()=> {
    dispatch(fetchProducts())
  },[])
  console.log(products);
  return (
    <>
    <Header/>
    <Table striped bordered hover className={"table-dark"}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Created By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => {
          return <ProductRow key={product.id}product={product} index={i + 1}/>
          })}
      </tbody>
    </Table>
    </>
  );
}