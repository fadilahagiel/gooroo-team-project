import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {createProduct} from "../store/actionCreator"
import { useNavigate } from 'react-router-dom';
import {fetchCategory} from '../store/actionCreator'
import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'

function CreateProduct() {
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories)

    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        mainImg: '',
        stock: 0,
        price: 0,
        categoryId: '',

    })
    
    useEffect(()=> {
        dispatch(fetchCategory())
      },[])
      console.log(categories);

    const dispatch = useDispatch();

    const submitProduct = (e) => {
        e.preventDefault();
        console.log(productForm);
        dispatch(createProduct(productForm))
        .then(() => navigate('/'))
    }

    const [pictureForm, setPictureForm] = useState({
        imgUrl1:'',
        imgUrl2:'',
        imgUrl3:'',
    })


    return (
        <>
        <h2 style={{paddingTop:"40px", paddingLeft: "50px"}}>Input your new class here</h2><br></br><br></br>
        <div className="row">
            <div className='col'>
        <Form style={{"width": "80%", "margin": "auto"}} onSubmit={submitProduct}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name.." onChange={(e) => {
                // console.log(e.target.value);
                setProductForm({
                    ...productForm,
                    name: e.target.value,
                })
            }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} 
            placeholder="Enter Product Description.." onChange={(e) => {
                // console.log(e.target.value);
                setProductForm({
                    ...productForm,
                    description: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Product price.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setProductForm({
                    ...productForm,
                    price: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Quota</Form.Label>
            <Form.Control type="number" placeholder="Product stock.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setProductForm({
                    ...productForm,
                    stock: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Category: </Form.Label><br></br>
            <Form.Select aria-label="Default select example"
            onChange={(e) => {
                // console.log(e.target.value);
                setProductForm({
                    ...productForm,
                    categoryId: e.target.value,
                })
            }}  >
                <option>Select Subject</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                      );
                })}
            </Form.Select>
        </Form.Group><br></br><br></br>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
            </div>
            <div className='col'>
                <img className="img-fluid" src="https://images.pexels.com/photos/2675061/pexels-photo-2675061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{borderRadius: "20px"}}/>
            </div>
        </div>
        </>
    );
}

export default CreateProduct;