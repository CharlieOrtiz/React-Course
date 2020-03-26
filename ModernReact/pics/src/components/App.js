import React from 'react';
import axios from 'axios';
//Axios is a package from npm to fetch data, this option is an alternative way of the fetch method. Although is a package an it has to install some files to our app, this option makes the development easier than fetch and allow us to write less code and have a better Development Experience.
import SearchBar from './SearchBar';

class App extends React.Component {
    onSearchSubmit(term) {
        console.log(term);
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: "10px"}}>
                <SearchBar onSubmit={this.onSearchSubmit}/>
            </div>
        );
    }
}

export default App;