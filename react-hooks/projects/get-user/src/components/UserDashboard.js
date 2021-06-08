import React from 'react';
import User from './User';

const UserDashboard = ({users}) => {
    return (
        <div className='user-dashboard'>
            {
                users.map((user, index) => (
                    <User
                        user={user}
                        key={index}
                    />
                ))
            }
        </div>
    )
};

export default UserDashboard;