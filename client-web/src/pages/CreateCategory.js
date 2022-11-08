import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {createCategory} from "../store/actionCreator"
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function CreateCategory() {
    const navigate = useNavigate();
    const [categoryForm, setCategoryForm] = useState({
        name: ""

    })

    const dispatch = useDispatch();

    const submitCategory = (e) => {
        e.preventDefault();
        console.log(categoryForm);
        dispatch(createCategory(categoryForm))
        .then(() => {navigate('/categories');
        Swal.fire(
            'Success Create Category!',
            '',
            'success'
          )
        })
        .catch((err)=> {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  err.name,
              });
        })
    }

    return (
        <>
        <h2>Input Category Name Here..</h2><br></br><br></br>
        <Form style={{"width": "80%", "margin": "auto"}} onSubmit={submitCategory}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name.." onChange={(e) => {
                // console.log(e.target.value);
                setCategoryForm({
                    ...categoryForm,
                    name: e.target.value,
                })
            }} />
        </Form.Group>

        

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </>
    );
}

export default CreateCategory;