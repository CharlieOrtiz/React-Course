import React from 'react';
import unsplash from '../api/unsplash'; //Get the instance config of axios
//Axios is a package from npm to fetch data, this option is an alternative way of the fetch method. Although is a package an it has to install some files to our app, this option makes the development easier than fetch and allow us to write less code and have a better Development Experience.
import SearchBar from './SearchBar';
import ImageList from './ImagesList';

class App extends React.Component {
    state = {
        images: []
    };

    onSearchSubmit = async (term) => {
        //Here our get method will merge with the instance config that has our unsplash variable
        const response = await unsplash.get('/search/photos', {
            params: {query: term},
        });

        this.setState({images: response.data.results});
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: "10px"}}>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <ImageList images= {this.state.images} />
            </div>
        );
    }
}

export default App;