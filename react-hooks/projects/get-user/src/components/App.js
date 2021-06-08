import React, {useState, useCallback} from 'react';
import GetUserForm from './GetUserForm';
import UserDashboard from './UserDashboard'

const USER_API = 'https://randomuser.me/api/?inc=name,email,phone,picture&noinfo';

const App = () => {
    const [users, setUsers] = useState([]);
    const [fetchStatus, setFetchStatus] = useState('');

    const getUsers = useCallback((mount) => {
        setFetchStatus('PENDING');
        fetch(`${USER_API}&results=${mount}`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.results);
                setFetchStatus('SUCCESS');
            })
            .catch((message) => {
                setFetchStatus(message.error);
                console.log(message.error);
            });
    }, [setUsers, setFetchStatus]);

    return (
        <div className='main-container'>
            <h1>Random User</h1>
            <GetUserForm
                getUsers={getUsers}
            />
            {
                ((status) => {
                    if(status === 'PENDING') {
                        return (
                            <div className ='loader'></div>
                        )
                    } else if (status === 'SUCCESS') {
                        return (
                            <UserDashboard
                                users={users}
                            />
                        )
                    } else {
                        return (
                            <span>{status}</span>
                        )
                    }
                })(fetchStatus)
            }
        </div>
    )
}

export default App;