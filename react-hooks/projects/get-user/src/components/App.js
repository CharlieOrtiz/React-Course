import React, {useState, useEffect} from 'react';
import useFetch from './useFetch';
import GetUserForm from './GetUserForm';
import UserDashboard from './UserDashboard'

const USER_API = 'https://randomuser.me/api/?inc=name,email,phone,picture&results=';
const INITIAL_USERS = 1;

const App = () => {
    // const [numberOfUsers, setNumberOfUsers] = useState(1);
    const [{ data, isLoading, error }, fetchFrom] = useFetch(USER_API + INITIAL_USERS);
    // const [users, setUsers] = useState(null);
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)
    // const [fetchStatus, setFetchStatus] = useState('');

    // useEffect(() => {
    //     // setFetchStatus('PENDING');
    //     setLoading(true);
    //     fetch(`${USER_API}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setUsers(data.results);
    //             // setFetchStatus('SUCCESS');
    //             setLoading(false);
    //         })
    //         .catch((message) => {
    //             setError(message.error);
    //             console.log(message.error);
    //             setLoading(false);
    //         });
    // }, [setUsers, setLoading, setError]);

    // useEffect(() => {
    //     fetchFrom()
    // }, [])

    
    const handleSubmit = (numberOfUsers) => {
        fetchFrom(USER_API + numberOfUsers);
    };

    return (
        <div className='main-container'>
            <h1>Random User</h1>
            <GetUserForm handleSubmit={handleSubmit} initialValue={INITIAL_USERS}/>
            { isLoading && <div className ='loader'></div> }
            { error && <span>{error}</span>}
            { !isLoading && !error && data && <UserDashboard users={data.results} />}
            {/* { fetchStatus === 'PENDING' ? (
                <div className ='loader'></div>
            ) : fetchStatus === 'SUCCESS' ? (
                <UserDashboard users={users} />
            ) : (
                <span>{fetchStatus}</span>
            )} */}
            {/* {
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
            } */}
        </div>
    )
}

export default App;