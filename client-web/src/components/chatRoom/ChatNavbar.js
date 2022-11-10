import React from 'react'
import './style.scss'

const ChatNavbar = () => {
    return(
        <div className='navbar'>
            <span className="logo">Gooroo Chat</span>
            <div>
                <img/>
                <span>John</span>
                <button>logout</button>
            </div>
        </div>
    )
}

export default ChatNavbar