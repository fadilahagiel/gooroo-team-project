import {Container, Row, Col, Table, Button, Card, Text} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'

export default function ChatPage () {
    return(
        <>
        <div style={{display: 'flex'}}>
            <Container style={{flex: '1',height: "100vh", backgroundColor:'rgba(9, 11, 72, 0.8)'}}>
            <h1 style={{paddingTop: '10px', color: 'white'}}>Contacts</h1>
                <Container className={'p-5'} style={{flex: '2',backgroundColor: "", height: '80vh', margin: '25, 25, 25, 25'}}>    
                    <Button style={{display: "flex", marginBottom: '30px', backgroundColor: 'rgba(250,250,250,0.5'}} className={'mb-4, flex-row'}>
                        <img style={{flex: "1", maxWidth:'100px', borderRadius: '100%'}}src='https://static.remove.bg/remove-bg-web/221525818b4ba04e9088d39cdcbd0c7bcdfb052e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'/>
                        <h4 style={{flex: "4", padding:'15px'}}>Students Name</h4>
                    </Button>
                    <Button style={{display: "flex", marginBottom: '30px', backgroundColor: 'rgba(250,250,250,0.5'}} className={'mb-4, flex-row'}>
                        <img style={{flex: "1", maxWidth:'100px', borderRadius: '100%'}}src='https://static.remove.bg/remove-bg-web/221525818b4ba04e9088d39cdcbd0c7bcdfb052e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'/>
                        <h4 style={{flex: "4", padding:'15px'}}>Students Name</h4>
                    </Button>
                    <Button style={{display: "flex", marginBottom: '30px', backgroundColor: 'rgba(250,250,250,0.5'}} className={'mb-4, flex-row'}>
                        <img style={{flex: "1", maxWidth:'100px', borderRadius: '100%'}}src='https://static.remove.bg/remove-bg-web/221525818b4ba04e9088d39cdcbd0c7bcdfb052e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'/>
                        <h4 style={{flex: "4", padding:'15px'}}>Students Name</h4>
                    </Button>
                    <Button style={{display: "flex", marginBottom: '30px', backgroundColor: 'rgba(250,250,250,0.5'}} className={'mb-4, flex-row'}>
                        <img style={{flex: "1", maxWidth:'100px', borderRadius: '100%'}}src='https://static.remove.bg/remove-bg-web/221525818b4ba04e9088d39cdcbd0c7bcdfb052e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'/>
                        <h4 style={{flex: "4", padding:'15px'}}>Students Name</h4>
                    </Button>
                </Container>
            </Container>
            <Container style={{flex: '3', backgroundColor: "rgba(9, 11, 72, 0.1)", height: "100vh"}}>
                <text className={'card'} style={{maxWidth: "400px", padding:'10px',margin:'15px'}}>Teacher</text>
                <text className={'card'} style={{maxWidth: "400px", padding:'10px',margin:'15px', right: '0', backgroundColor: 'rgba(200,210,250, 1)'}}>Student</text>
                <textarea style={{width: '800px', position: "absolute", bottom: '0'}}>
                </textarea>
                <button style={{position: 'absolute', height:'55px', bottom: '0', right: '0'}}>Send</button>
            </Container>
        </div>
        </>
    )
}