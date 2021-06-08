import React, {useState, useEffect} from 'react';

const GetUserForm = ({getUsers, initialValue=1}) => {
    const [userNum, setUserNum] = useState(initialValue)

    function onChangeInput(e) {
        setUserNum(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        getUsers(userNum);
    }

    useEffect(() => {
        getUsers(initialValue);
    }, [getUsers, initialValue])

    return (
        <form onSubmit={onSubmit} style={{marginBottom: '20px'}}>
            <input type="number" value={userNum} min={initialValue} onChange={onChangeInput}/>
            <input type="submit" value='Get Users'/>
        </form>
    )
}

export default GetUserForm;