import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    render() {
        //Get the latitude from the user to detemine if it is in the southern or northern
        window.navigator.geolocation.getCurrentPosition(
            position => console.log(position),
            err => console.log(err)
        );
        return <div>Latitude</div>
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);