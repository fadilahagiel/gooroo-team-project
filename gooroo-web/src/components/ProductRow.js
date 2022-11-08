import Image from 'react-bootstrap/Image'
import {deleteProduct} from "../store/actionCreator"
import {updateProduct} from "../store/actionCreator"
import Button from 'react-bootstrap/Button';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchProducts} from '../store/actionCreator'

export default function ProductRow 
({product, index}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteProductButton = (e) => {
    e.preventDefault();
    console.log(product.id);
    dispatch(deleteProduct(product.id))
    .then(() => {
      navigate('/'); 
        dispatch(fetchProducts())})
    
  }
  const updateProductButton = (e) => {
    e.preventDefault();

    navigate('/edit/' + product.id)
  }

  const formatPrice = () => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(product.price);
  }
    
    return(
        <tr className="align-middle text-center">
        <td>{index}</td>
        <td>{product.name}</td>
        <td><Image className='img-thumbnail' style={{width: "200px"}} src={product.mainImg}/></td>
        <td>{product.Category.name}</td>
        <td>{formatPrice(product.price)}</td>
        <td>{product.stock}</td>
        <td>{product.User.username}</td>
        <td>
          <Button onClick={deleteProductButton} className={"btn btn-danger"}>Delete</Button>
          <Button onClick={updateProductButton} className={"btn btn-success"}>Update</Button>
        </td>
      </tr>
    )
}