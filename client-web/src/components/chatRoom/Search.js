import React from 'react'
import './style.scss'

const Search = () => {
    return(
        <div className='search'>Search
            <div className='searchForm'>
                <input type='text' placeholder='find a user'/>
            </div>
            <div className='userChat'>
                <img src=""/>
                <div className='userChatInfo'>
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search