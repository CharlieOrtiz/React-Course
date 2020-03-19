import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner';

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
    //This is a helper method to put all the neccesary logic we might need to render one of many components, here we put all the neccesary return statements we might need
    renderContent = () => {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request"/>
    }

    render() {
        //Like we can notice, there are multiple return statements inside our render method. At some moment doing this and having some logic as the if statements inside this method can be reallly challenging, a way to resolve this problem is creating a helper method and put all this logic iside of it.
        /*if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request"/>*/
        
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);