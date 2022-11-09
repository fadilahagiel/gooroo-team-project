import {Outlet} from 'react-router-dom'
import MyNavbar from './Navbar'
export default function PageLayout () {
    return (
        <div style={{fontFamily: "monospace"}}>
            <MyNavbar />
            <div style={{paddingTop:" 50px",height: '100vh',fontFamily: "monospace", backgroundColor: "rgba(10,10,10,0.2)"}}>
                <Outlet />
            </div>
        </div>
    )
}