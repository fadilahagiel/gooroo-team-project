import {Outlet} from 'react-router-dom'
import MyNavbar from './Navbar'
export default function PageLayout () {
    return (
        <div style={{backgroundColor: "rgba(10,10,10,0.2)", height: "100vu"}}>
        <MyNavbar />
        <div style={{fontFamily: "monospace", height: "100vh"}}>
        <Outlet />
        </div>
        </div>
    )
}