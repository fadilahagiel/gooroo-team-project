import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { createClass, postClass } from "../store/actionCreator"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { subjects } from '../assets/subject'

function CreateClass() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [classForm, setClassForm] = useState({
        name: '',
        description: '',
        quota: 0,
        price: 0,
        SubjectId: 0,
        url: ''
    })
    const [schArr, setSchArr] = useState([]);
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [schedulesInput, setSchedulesInput] = useState([{ startDate: '', endDate: '' }])

    // const handleSchedule = (input) => {
    //     setClassForm({...classForm, Schedules: [...Schedules, input]})
    // }

    const submitClass = (e) => {
        const { name, description, quota, price, SubjectId, url } = classForm
        e.preventDefault();
        const output = {
            name, description, url, quota: Number(quota), price: Number(price), SubjectId: Number(SubjectId), schedules: schArr
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
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: '',
    })

    const handleChangeSchArr = (e) => {
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
        if (!startTime || !endTime ) {
            return 
        }
        setSchArr([...schArr, { startDate: startTime, endDate: endTime }]);
        // console.log(schArr, 'ini sch');

    };

    const handleRemoveSchInput = (index) => {
        const values = [...schArr];
        values.splice(index, 1);
        setSchArr(values);
    };
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const handleSchedulesInput = (index, e) => {
        const values = [...schedulesInput];
        values[index][e.target.name] = e.target.value;
        setSchedulesInput(values);
    };

    const handleRemoveScheduleInput = (index) => {
        const values = [...schedulesInput];
        values.splice(index, 1);
        setSchedulesInput(values);
    };

   


    return (
        <>
            <h2 style={{ paddingTop: "40px", paddingLeft: "50px" }}>Input your new class here</h2><br></br><br></br>
            <div className="row">
                <div className='col'>
                    <Form style={{ "width": "80%", "margin": "auto" }} onSubmit={submitClass}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class Name.." onChange={(e) => {
                                // console.log(e.target.value);
                                setClassForm({
                                    ...classForm,
                                    name: e.target.value,
                                })
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder="Enter Class Description.." onChange={(e) => {
                                    // console.log(e.target.value);
                                    setClassForm({
                                        ...classForm,
                                        description: e.target.value,
                                    })
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Class price.."
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setClassForm({
                                        ...classForm,
                                        price: e.target.value,
                                    })
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStock">
                            <Form.Label>Quota</Form.Label>
                            <Form.Control type="text" placeholder="Class quota.."
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setClassForm({
                                        ...classForm,
                                        quota: e.target.value,
                                    })
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStock">
                            <Form.Label>Class URL</Form.Label>
                            <Form.Control type="text" placeholder="Class URL.."
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setClassForm({
                                        ...classForm,
                                        url: e.target.value,
                                    })
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStock">
                            <Form.Label>Subject: </Form.Label><br></br>
                            <Form.Select aria-label="Default select example"
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setClassForm({
                                        ...classForm,
                                        SubjectId: e.target.value,
                                    })
                                }}  >
                                <option value={false}>Select Subject</option>
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
                    <img className="img-fluid" src="https://images.pexels.com/photos/2675061/pexels-photo-2675061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{ borderRadius: "20px" }} />
                </div>
            </div>
        </>
    );
}

export default CreateClass;