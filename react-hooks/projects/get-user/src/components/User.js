import React from 'react';

const User = ({user: {name, email, phone, picture}}) => {
    return (
        <div className='user-card'>
            <div className='thumbnail-container'>
                <img src={picture.thumbnail} className="" alt=''/>
            </div>
            <div className='user-information'>
                <h3>{`${name.title} ${name.first} ${name.last}`}</h3>
                <span>{email}</span>
                <span>{phone}</span>
            </div>
        </div>
    )
}

export default User;