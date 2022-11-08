import {Outlet} from 'react-router-dom'
import MyNavbar from './Navbar'
export default function PageLayout () {
    return (
        <div style={{fontFamily: "monospace", backgroundColor: "rgba(10,10,10,0.2)", height: '100vh'}}>
            <MyNavbar />
            <br></br>
            <br></br>
            <br></br>
            <div style={{fontFamily: "monospace"}}>
                <Outlet />
            </div>
        </div>
    )
}