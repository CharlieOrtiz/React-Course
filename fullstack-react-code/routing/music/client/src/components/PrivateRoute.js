import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { client } from '../Client';

const PrivateRoute = ({component, ...rest}) => {
    return <Route {...rest} render={(props) => {
        console.log(props.location)
        return client.isLoggedIn() ? (
            React.createElement(component, props)
        ) : (//Every time we have a Redirect component we can access to the location object inside the component that our Redirect is rendering, but this location object is going to read the values that Redirect provides and not any other values from a higher function.   
            <Redirect to={{ //Redirect's 'to' property can accepts a string or the location object(this object most of the time used to define a state value)
                pathname: '/login',
                state: {
                    from: props.location
                }
            }} /> //Here we just provide the location object to the 'to' property, this location object is being modifying, defining state equal to an object that reads the location object from a higher component (Route)
        )
    }} />
};

export default PrivateRoute;
