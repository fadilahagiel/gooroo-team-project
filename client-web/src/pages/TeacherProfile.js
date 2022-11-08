import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { fetchTeacherProfile } from '../store/actionCreator';
import ClassRow from '../components/ClassRow.js'

export default function ClassDetail () {
    const teachers = useSelector((state) => state.teachers)
    const dispatch = useDispatch()
    
    console.log(teachers, "<<<< ini classes");
  
    useEffect(()=> {
      dispatch(fetchTeacherProfile())
    },[])
    

    const navigate = useNavigate();
    return (
        <>
        <Container style={{display: "flex", height: "100vh", marginTop: '30px', height: '150vh', paddingBottom: '10vh',textAlign: 'center', backgroundColor:"rgba(9, 11, 72, 0.5)",borderRadius: "5%", color: "rgba(190,190,190,1)"}}>
            <Container style={{flex: '5', textAlign: 'center', padding: '10%', paddingBottom: "10vh",height: '40vh', borderRadius: "5%"}}>
                <img src={teachers.image} style={{maxHeight: "400px", borderRadius: '200px', marginBottom: '40px'}}/>
                <h1>{teachers.fullName}</h1>
                <h4 style={{marginTop: '80px', textJustify: ''}}>{teachers.bio}</h4>
                <h1 style={{marginTop: '50px'}}>Average Rating: {teachers.averageRating}</h1>
                <h1 style={{marginTop: '50px', marginBottom: '25px'}}>Class List</h1>
         
            </Container>
        </Container>
        
        </>

    )
}