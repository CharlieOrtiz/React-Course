import React from 'react';
import ReactDOM from 'react-dom';
//Importar faker library to generate fake content
import faker from 'faker';
//To get a file that is exported we use import and provide the specific path to it 
import CommentDetail from './CommentDetail'; //If the file is at the same leve we just put ./ and if it is a js file we don't need to specify the extension, webpack do this for us

const App = () => {
    return(
        <div className="ui container comments">
            <CommentDetail />
            <CommentDetail />
            <CommentDetail />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);