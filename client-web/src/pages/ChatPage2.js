import React from 'react'
import Sidebar from '../components/chatRoom/Sidebar'
import Chat from '../components/chatRoom/Chat'

const ChatPage2 = () => {
    return(
        <div className='home'>
            <div className='container'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default ChatPage2