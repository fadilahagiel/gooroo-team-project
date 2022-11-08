import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import ProductRow from '../components/ClassRow'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { fetchOneClass } from '../store/actionCreator';
import { useParams } from "react-router-dom";



export default function ClassDetail () {
    const params = useParams();
    const dispatch = useDispatch()
    const id = params.id
    const navigate = useNavigate();
    useEffect(()=> {
        dispatch(fetchOneClass(id))
      },[])
    const oneClass = useSelector((state) => state.oneClass)

    return (
        <>
        <Container style={{display: "flex", height: "100vh", marginTop: '30px', }}>
            <Container style={{backgroundColor:"red", flex: '2', textAlign: 'center', paddingTop: '15%', borderStartStartRadius: '20px', backgroundColor:'rgba(9, 11, 72, 0.5)'}}>
                <img src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?w=2000" style={{marginBottom: '10px',maxHeight: "30%", borderRadius:'100%'}}/>
                <h2>{oneClass.Teacher.fullName}</h2>
                <h2>-Schedule?</h2>
            </Container>
            <Container style={{backgroundColor:"rgba(9, 11, 72, 0.1)", flex: '5', textAlign: 'center', padding: '10%', borderStartEndRadius: '20px'}}>
                <h1>{oneClass.name}</h1>
                <h4 style={{marginTop: '100px', textJustify: ''}}>{oneClass.description}</h4>
                <h1 style={{marginTop: '50px'}}>Current Student: x/x</h1>
                <h1 style={{marginTop: '50px'}}>Rating: {oneClass.averageRating}</h1>
                <h1 style={{marginTop: '50px', marginBottom: '25px'}}>Students List</h1>
                <Table striped bordered hover className={"table-dark"}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody> */}
                        {/* {products.map((product, i) => {
                        return <ProductRow key={product.id}product={product} index={i + 1}/>
                        })} */}
                    {/* </tbody> */}
                    <tbody>
                        <tr>
                        <td>cek</td>
                        <td>cek</td>
                        <td>cek</td>
                        <td><Button onClick={() => navigate('/student-profile')}>Detail</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
        
        </>

    )
}