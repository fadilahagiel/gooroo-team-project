import Container from 'react-bootstrap/Container';

export default function Header(){
   return (
    <>
        <h1 style={{fontFamily: "monospace" }} className={"mb-3"}>Welcome To Gooroo Web Services</h1>
        <Container>
            <img  className={"img-fluid mb-5" } src="/1.png"/>
        </Container>
    </>
    )
}