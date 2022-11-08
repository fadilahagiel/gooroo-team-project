import '../App.css'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';


function WelcomePage () {
    const navigate = useNavigate();

    return (
        <>
        <div className='welcomeDiv'>
                <img className='welcomeImg' src={logo}/>
            <Container style={{"text-align": "center"}}>
                    <h1 className='welcomeText'>Welcome, Teacher!</h1>
                    <div className='buttonContainer'>
                        <Button className='button' style={{margin:'10px', backgroundColor:"#D99528", color:"black", fontSize:"30px"}} onClick={() => navigate('/register') }>Register</Button>
                        <Button className='button' style={{margin:'10px', backgroundColor:"#98E661", color:"black", fontSize:"30px"}} onClick={() => navigate('/login') }>Login</Button>
                    </div>
            </Container>
        </div>
        
        
        </>
    )
}

export default WelcomePage