import React from 'react'
import ChatNavbar from './ChatNavbar'
import Search from './Search'

import './style.scss'

const Sidebar = () => {
    return(
        <div className='sidebar'>
            <ChatNavbar/>Navbar
            <Search/>
        </div>
    )
}

export default Sidebar