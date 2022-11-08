import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {registerAdmin} from "../store/actionCreator"
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function RegisterAdmin() {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        saldo: 10000,
        role: 'teacher'

    })

    const dispatch = useDispatch();

    const submitRegister = (e) => {
        e.preventDefault();
        console.log(registerForm);
        dispatch(registerAdmin(registerForm))
        .then(() => {
            navigate('/');
            Swal.fire(
                'Success Register!',
                '',
                'success'
              )
        })
        
    }

    return (
        <>
        <h2 style={{paddingTop:"40px", paddingLeft: "50px"}}>Teacher's Registration</h2><br></br><br></br>
        <div className="row" style={{padding: "10px"}}>
            <div className='col' style={{flex: 1}}>
        <Form style={{"width": "40%", "margin": "auto"}} onSubmit={submitRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username.." onChange={(e) => {
                // console.log(e.target.value);
                setRegisterForm({
                    ...registerForm,
                    username: e.target.value,
                })
            }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" rows={3} 
            placeholder="Enter Email.." onChange={(e) => {
                // console.log(e.target.value);
                setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                })
            }}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMainImg">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password.." 
            onChange={(e) => {
                // console.log(e.target.value);
                setRegisterForm({
                    ...registerForm,
                    password: e.target.value,
                })
            }}  />
        </Form.Group>

        <Button variant="primary" type="submit">
            Register
        </Button>
        </Form>
            </div>
            <div className='col' style={{flex: 0.55 }}>
                <img className="img-fluid" src="https://www.freeiconspng.com/uploads/png-format-images-of-teacher-icons-21.png"/>
            </div>
        </div>
        </>
    );
}

export default RegisterAdmin;