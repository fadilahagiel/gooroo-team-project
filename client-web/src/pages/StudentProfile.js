import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import ProductRow from '../components/ClassRow'
import { useNavigate } from 'react-router-dom';

export default function ClassDetail () {
    const navigate = useNavigate();
    return (
        <>
        <Container style={{display: "flex", height: "100vh", marginTop: '30px', height: '120vh', paddingBottom: '10vh',textAlign: 'center', backgroundColor:"rgba(9, 11, 72, 0.5)",borderRadius: "5%", color: "rgba(190,190,190,1)"}}>
            <Container style={{flex: '5', textAlign: 'center', padding: '10%', paddingBottom: "10vh",height: '40vh', borderRadius: "5%"}}>
                <img src="https://img.freepik.com/free-photo/happy-young-female-student-holding-notebooks-from-courses-smiling-camera-standing-spring-clothes-against-blue-background_1258-70161.jpg?w=2000" style={{maxWidth: "50%", borderRadius: '200px', marginBottom: '40px'}}/>
                <h1>Student's Name</h1>
                <h1 style={{marginTop: '50px', marginBottom: '50px'}}>Email</h1>
                <Button style={{height: '80px', width: '120px', backgroundColor: "#98E661", color:'navy', fontSize: '20px'}}>Chat</Button>
            </Container>
        </Container>
        
        </>

    )
}