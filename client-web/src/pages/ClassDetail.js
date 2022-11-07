import {Container, Row, Col, Table} from 'react-bootstrap'
import ProductRow from '../components/ProductRow'

export default function ClassDetail () {
    return (
        <>
        <Container style={{display: "flex", height: "100vh", marginTop: '30px'}}>
            <Container style={{backgroundColor:"red", flex: '2', textAlign: 'center', paddingTop: '15%'}}>
                <img src="https://www.freepnglogos.com/uploads/teacher-png/boy-teacher-clipart-clipground-25.png" style={{maxHeight: "30%"}}/>
                <h2>Teacher's Name</h2>
            </Container>
            <Container style={{backgroundColor:"orange", flex: '5', textAlign: 'center', padding: '10%'}}>
                <h1>Class Name</h1>
                <h4 style={{marginTop: '100px', textJustify: ''}}>class Description class Description class Description class Description class Description class Description class Description class Description class Description class Description class Description </h4>
                <h1 style={{marginTop: '50px'}}>Current Student: x/x</h1>
                <h1 style={{marginTop: '50px'}}>Rating: x/x</h1>
                <h1 style={{marginTop: '50px', marginBottom: '25px'}}>Students List</h1>
                <Table striped bordered hover className={"table-dark"}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
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
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Container>
        
        </>

    )
}