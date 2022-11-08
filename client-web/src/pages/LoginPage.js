import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {login} from "../store/actionCreator"
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../App.css'



function LoginPage() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();

    const submitLogin = (e) => {
        e.preventDefault();
        console.log(loginForm);
        dispatch(login(loginForm))
        .then(() => 
            navigate('/'), 
            Swal.fire(
                'Success Login!',
                '',
                'success'
              )
        )
        
    }
        return (
            <>
            <div className='loginBox'>
                <div className='sub-loginBox'>
                    <Form style={{"width": "60%", "margin": "auto"}} onSubmit={submitLogin}>
                        <h1 className="mt-3 mb-5" style={{textAlign: "center"}}>Login Form</h1>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email.." onChange={(e) => {
                                console.log(e.target.value);
                                setLoginForm({
                                    ...loginForm,
                                    email: e.target.value,
                                })
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" 
                            placeholder="Enter Password.." onChange={(e) => {
                                console.log(e.target.value);
                                setLoginForm({
                                    ...loginForm,
                                    password: e.target.value,
                                })
                            }}  />
                        </Form.Group><br></br>

                        <Button type="submit" style={{align:"center", backgroundColor: "#98E661", color:"navy"}}>
                        Submit
                        </Button>
                    </Form>
                </div>
            </div>
            </>
        )
}

export default LoginPage