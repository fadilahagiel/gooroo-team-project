import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {createProduct, postClass} from "../store/actionCreator"
import { useNavigate } from 'react-router-dom';
import {fetchCategory} from '../store/actionCreator'
import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {subjects} from '../assets/data/subjects'

function CreateProduct() {
    const navigate = useNavigate();
    const [schArr, setSchArr] = useState([]);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        quota: 0,
        price: 0,
        SubjectId: 0,
        url: ''
    })
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    useEffect(()=> {
        dispatch(fetchCategory())
      },[])

    const dispatch = useDispatch();

    const submitProduct = (e) => {
        const { name, description, quota, price, SubjectId, url } = productForm
        e.preventDefault();
        const output = {
            name, description, url, quota: Number(quota), price:Number(price), SubjectId: Number(SubjectId), schedules: schArr
        }
        dispatch(postClass(output))
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
        // dispatch(createProduct(productForm))
        // .then(() => navigate('/'))
    }

    const [pictureForm, setPictureForm] = useState({
        imgUrl1:'',
        imgUrl2:'',
        imgUrl3:'',
    })

    const handleChangeSchArr = ( e) => {
        const values = [...schArr];
        // values[index][e.target.name] = e.target.value;
        // setSchArr(values);
    };

    const handleStartChange = (e) => {
        setStartTime(e.target.value)
    };
    const handleEndChange = (e) => {
        setEndTime(e.target.value)
    };

    const handleAddScheduleInput = () => {
        setSchArr([...schArr, { startDate: startTime, endDate: endTime }]);
        // console.log(schArr, 'ini sch');

    };

    const handleRemoveSchInput = (index) => {
        const values = [...schArr];
        values.splice(index, 1);
        setSchArr(values);
    };
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return (
        <>
        <h2 style={{paddingTop:"40px", paddingLeft: "50px"}}>Input your new class here</h2><br></br><br></br>
        <div className="row">
            <div className='col'>
        <Form style={{"width": "80%", "margin": "auto"}} onSubmit={submitProduct}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Class Name.." onChange={(e) => {
                setProductForm({
                    ...productForm,
                    name: e.target.value,
                })
            }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} 
            placeholder="Enter Class Description.." onChange={(e) => {
                setProductForm({
                    ...productForm,
                    description: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Class price.." 
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
            <Form.Control type="number" placeholder="Class quota.." 
            onChange={(e) => {
                setProductForm({
                    ...productForm,
                    quota: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Subject: </Form.Label><br></br>
            <Form.Select aria-label="Default select example"
            onChange={(e) => {
                setProductForm({
                    ...productForm,
                    SubjectId: e.target.value,
                })
            }}  >
                <option>Select Subject</option>
                {subjects.map((el) => {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                      );
                })}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Label>Zoom/Meet URL</Form.Label>
                <Form.Control type="text" placeholder="Class URL.."
                    onChange={(e) => {
                        setProductForm({
                            ...productForm,
                            url: e.target.value,
                        })
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Label>Start</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Product stock.."
                                onChange={(e) => handleStartChange(e)}
                            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Label>End</Form.Label>
                <Form.Control type="datetime-local" placeholder="Product stock.."
                                onChange={(e) => handleEndChange(e)}
                />
            </Form.Group>
                <div className="text-left mt-4">
                    <button className="ml-6">
                        <label
                            className="btn btn-outline btn-xs"
                            onClick={handleAddScheduleInput}
                        >
                            Add Schedule
                        </label>
                    </button>
                </div>          
                        {schArr.map((el, index) => {
                            return (
                                <div key={index}>
                                    <label className="input-group mt-2" key={index}>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 d-flex">
                                                <p>{new Date(el.startDate).toLocaleDateString('id-ID', options)}  =</p>
                                                <p className="mx-3">{new Date(el.startDate).toLocaleTimeString()} - {new Date(el.endDate).toLocaleTimeString()}</p>
                                                <Button variant="danger" onClick={handleRemoveSchInput}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </label>
                                   
                                </div>
                            );
                        })}
                       
                        <br></br><br></br>
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