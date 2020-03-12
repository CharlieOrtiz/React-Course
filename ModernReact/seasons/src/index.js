import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'

class App extends React.Component {

    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        //Get the latitude from the user to detemine if it is in the southern or northern
         window.navigator.geolocation.getCurrentPosition(
            //At this point just one of the functions is executed according with the user response in the geolocation question
            position => this.setState({lat: position.coords.latitude}), //If the user allows the location
            err => this.setState({errorMessage: err.message}) //If the user denied the location
        );
    }

    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <div>Loading!</div>
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);