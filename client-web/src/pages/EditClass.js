import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {createClass} from "../store/actionCreator"
import { useNavigate, useParams } from 'react-router-dom';
import {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'


function CreateClass() {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("MASUK EFFECT GA SIH?");
        const [editClass, setEditClass] = useState({
            name: '',
            description: '',
            mainImg: '',
            stock: 0,
            price: 0,
            categoryId: '',
    
        })
            const access_token = localStorage.getItem("access_token")
            fetch("https://localhost:3000/classes/" + params.id, {
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
                    setEditClass({
                        name: res.product.name,
                        description: res.product.description,
                        price: res.product.price,
                        stock: res.product.stock,
                        mainImg: res.product.mainImg,
                        catgoryId: res.product.categoryId,
                    });
                })
            .catch((err)=>{
                console.log(err);
              })
        }, [])

    const [classForm, setClassForm] = useState({
        name: '',
        price: 0,
        quota: 0,
        description: '',
        url: '',
        SubjectId: '',
        Schedules: []

    })
    
    const [schedulesInput, setSchedulesInput] = useState([{startDate: '', endDate: ''}])

    // const handleSchedule = (input) => {
    //     setClassForm({...classForm, Schedules: [...Schedules, input]})
    // }

    const handleSchedulesInput = (index, e) => {
        const values = [...schedulesInput];
        values[index][e.target.name] = e.target.value;
        setSchedulesInput(values);
      };
    
      const handleAddScheduleInput = () => {
        setSchedulesInput([...schedulesInput, {startDate: '', endDate: ''}]);
      };
    
      const handleRemoveScheduleInput = (index) => {
        const values = [...schedulesInput];
        values.splice(index, 1);
        setSchedulesInput(values);
      };


    const submitClass = (e) => {
        e.preventDefault();
        setClassForm({classForm, Schedules: schedulesInput })
        console.log(classForm);
        // dispatch(createClass(classForm))
        // .then(() => navigate('/'))
    }


    return (
        <>
        <h2 style={{paddingTop:"40px", paddingLeft: "50px"}}>Edit your class</h2><br></br><br></br>
        <div className="row">
        <div className='col'>
                <img className="img-fluid" src="https://images.pexels.com/photos/2675061/pexels-photo-2675061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{borderRadius: "20px", paddingLeft: '100px'}}/>
        </div>
            <div className='col'>
        <Form style={{"width": "80%", "margin": "auto"}} onSubmit={submitClass}>
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
            }}  />
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
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Quota</Form.Label>
            <Form.Control type="text" placeholder="Class quota.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setClassForm({
                    ...classForm,
                    url: e.target.value,
                })
            }}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStock">
            <Form.Label>Class URL</Form.Label>
            <Form.Control type="number" placeholder="Class quota.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setClassForm({
                    ...classForm,
                    quota: e.target.value,
                })
            }}  />
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
                <option selected={false}>Select Subject</option>
                <option value={1}>Matematika Dasar</option>
                <option value={2}>Matematika Saintek</option>
                <option value={3}>Fisika</option>
                <option value={4}>Kimia</option>
                <option value={5}>Biologi</option>
                <option value={6}>Ekonomi</option>
                <option value={7}>Geografi</option>
                <option value={8}>Akuntansi</option>
                <option value={9}>Sosiologi</option>
                <option value={10}>Sejarah</option>
                <option value={11}>Bahasa Indonesia</option>
                <option value={12}>Bahasa Inggris</option>
            </Form.Select>
        </Form.Group><br></br><br></br>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Schedule</Form.Label>
            <button>
            <Form.Control as="text" rows={3} 
            placeholder="Enter Class Description.." onClick={(e) => {
                // console.log(e.target.value);
                handleAddScheduleInput()
            }}  />
            </button>
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
            </div>
        
        </div>
        </>
    );
}

export default CreateClass;