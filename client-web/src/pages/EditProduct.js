import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {createProduct} from "../store/actionCreator"
import {updateProduct} from "../store/actionCreator"
import {updatePicture} from "../store/actionCreator"
import {useSelector,  useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {useEffect} from 'react'
import Swal from 'sweetalert2'
import {fetchCategory} from '../store/actionCreator'


function UpdateProduct() {
    console.log("masuk page edit");
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories)
    
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        mainImg: '',
        stock: 0,
        price: 0,
        categoryId: '',

    })

    const [editPicture, setEditPicture] = useState({
        imgUrl1:'',
        imgUrl2:'',
        imgUrl3:'',
    })

    useEffect(()=> {
        dispatch(fetchCategory())
      },[])
      console.log(categories);

    useEffect(() => {
        console.log("MASUK EFFECT GA SIH?");

            const access_token = localStorage.getItem("access_token")
            fetch("https://p3-vintager-store.herokuapp.com/products/" + params.id, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    access_token
                },
            })
            .then((res)=>{
                console.log(res, "<< MASUK ACTION UPDATE ");
                if(!res.ok) {
                    throw new Error('hadrcoded Error')
                }
                return res.json();
            })
            .then((res) => {
                console.log(res, "PARAMS DI ACTION");
                if(res.product.Pictures.length > 2){
                    const i = res.product.Pictures.length
                    console.log(i, "<<<KOREWA I DESU");
                    setEditProduct({
                        name: res.product.name,
                        description: res.product.description,
                        price: res.product.price,
                        stock: res.product.stock,
                        mainImg: res.product.mainImg,
                        catgoryId: res.product.categoryId,
                    });
                    setEditPicture({
                    imgUrl1: res.product.Pictures[i-3].imgUrl,
                    imgUrl2: res.product.Pictures[i-2].imgUrl,
                    imgUrl3: res.product.Pictures[i-1].imgUrl
                })
                } else if (res.product.Pictures.length > 1) {
                    const i = res.product.Pictures.length
                    setEditProduct({
                        name: res.product.name,
                        description: res.product.description,
                        price: res.product.price,
                        stock: res.product.stock,
                        mainImg: res.product.mainImg,
                        catgoryId: res.product.categoryId,
                      });
                    setEditPicture({
                        imgUrl1: res.product.Pictures[i-2].imgUrl,
                        imgUrl2: res.product.Pictures[i-1].imgUrl,
                        imgUrl3: ""
                    })
                } else if (res.product.Pictures.length > 0) {
                    const i = res.product.Pictures.length
                    setEditProduct({
                        name: res.product.name,
                        description: res.product.description,
                        price: res.product.price,
                        stock: res.product.stock,
                        mainImg: res.product.mainImg,
                        catgoryId: res.product.categoryId,
                      });
                    setEditPicture({
                        imgUrl1: res.product.Pictures[i-1].imgUrl,
                        imgUrl2: "",
                        imgUrl3: ""
                    })
                } else {
                    setEditProduct({
                        name: res.product.name,
                        description: res.product.description,
                        price: res.product.price,
                        stock: res.product.stock,
                        mainImg: res.product.mainImg,
                        catgoryId: res.product.categoryId,
                        imgUrl1: "",
                        imgUrl2: "",
                        imgUrl3: ""
                      });
                }
            })
            .catch((err)=>{
                console.log(err);
              })
        }, [])

        const edit = (e) => {
            e.preventDefault();
            console.log(editProduct);

            dispatch(
              updateProduct({
                id: params.id,
                name: editProduct.name,
                description: editProduct.description,
                stock: editProduct.stock,
                price: editProduct.price,
                mainImg: editProduct.mainImg,
                categoryId: editProduct.categoryId,
                imgUrl1: editPicture.imgUrl1,
                imgUrl2: editPicture.imgUrl2,
                imgUrl3: editPicture.imgUrl3
              }),
            )
              .then(() => {
                navigate("/");
                Swal.fire(
                    'Success Edit Product!',
                    'You clicked the button!',
                    'success'
                  )
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:  err,
                });
              });
          };
        

    const submitProduct = (e) => {
        e.preventDefault();
        console.log(editProduct);
        dispatch(createProduct(editProduct))
        .then(() => navigate('/'))
    }

    return (
        <>
        <h2>Edit product here</h2><br></br><br></br>
        <div className="row">
             <div className='col'>
                <img className="img-fluid" src={editProduct.mainImg}/>
            </div>

            <div className='col'>
        <Form style={{"width": "80%", "margin": "auto"}} onSubmit={edit}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name.." onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    name: e.target.value,
                })
            }}
            value={editProduct.name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} 
            placeholder="Enter Product Description.." onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                })
            }}
            value={editProduct.description}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMainImg">
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" placeholder="Product main image.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    mainImg: e.target.value,
                })
            }} 
            value={editProduct.mainImg} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Product price.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    price: e.target.value,
                })
            }} 
            value={editProduct.price} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" placeholder="Product stock.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    stock: e.target.value,
                })
            }} 
            value={editProduct.stock} />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Category: </Form.Label><br></br>
            <Form.Select aria-label="Default select example"
            onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    categoryId: e.target.value,
                })
            }}
            value={editProduct.categoryId}  >
                <option selected disabled>Select Category</option>
                <option value="1">Electric Guitar</option>
                <option value="2">Guitar Amp</option>
                <option value="3">Pedal</option>
            </Form.Select>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Category: </Form.Label><br></br>
            <Form.Select aria-label="Default select example"
            onChange={(e) => {
                // console.log(e.target.value);
                setEditProduct({
                    ...editProduct,
                    categoryId: e.target.value,
                })
            }}  >
                <option>Select Category</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                      );
                })}
            </Form.Select>
        </Form.Group>


        <div style={{"width": "80%", "margin": "auto"}}>        
        <Form.Group className="mb-3" controlId="formBasicMainImg">
            <Form.Label>Additional Image 1</Form.Label>
            <Form.Control type="text" placeholder="additional image.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditPicture({
                    ...editPicture,
                    imgUrl1: e.target.value,
                })
            }} 
            value={editPicture.imgUrl1} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMainImg">
            <Form.Label>Additional Image 2</Form.Label>
            <Form.Control type="text" placeholder="additional image.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditPicture({
                    ...editPicture,
                    imgUrl2: e.target.value,
                })
            }} 
            value={editPicture.imgUrl2} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMainImg">
            <Form.Label>Additional Image 3</Form.Label>
            <Form.Control type="text" placeholder="additional image.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setEditPicture({
                    ...editPicture,
                    imgUrl3: e.target.value,
                })
            }} 
            value={editPicture.imgUrl3} />
        </Form.Group>
        </div>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
            </div>
            
        </div>
        </>
    );
}

export default UpdateProduct;