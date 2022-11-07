import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import ProductRow from '../components/ProductRow'
import { useNavigate } from 'react-router-dom';

export default function ClassDetail () {
    const navigate = useNavigate();
    return (
        <>
        <Container style={{display: "flex", height: "100vh", marginTop: '30px', height: '100vh', marginBottom: '10vh'}}>
            <Container style={{backgroundColor:"orange", flex: '5', textAlign: 'center', padding: '10%', paddingBottom: "10vh",height: '100vh', borderRadius: "5%"}}>
                <img src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?w=2000" style={{maxHeight: "40%", borderRadius: '200px', marginBottom: '40px'}}/>
                <h1>Teacher's Name</h1>
                <h4 style={{marginTop: '80px', textJustify: ''}}>Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio Teacher's bio </h4>
                <h1 style={{marginTop: '50px'}}>Average Rating: x/x</h1>
                <h1 style={{marginTop: '50px', marginBottom: '25px'}}>Class List</h1>
                <Table striped bordered hover className={"table-dark"}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Price</th>
                        <th>Quota</th>
                        <th>Average Rating</th>
                        <th>Subject</th>
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
                        <td>cek</td>
                        <td>cek</td>
                        <td>cek</td>
                        <td><Button onClick={() => navigate('/class') }>Detail</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
        
        </>

    )
}