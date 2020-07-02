import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import StreamCreate from './streams/streamCreate';
import StreamDelete from './streams/streamDelete';
import StreamEdit from './streams/streamEdit'
import StreamList from './streams/streamList'
import StreamShow from './streams/streamShow'
import Header from './header';

const App = () => {
    return (
        <div className='ui container'>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path='/' exact component={StreamList}/>
                    <Route path='/streams/new' component={StreamCreate}/>
                    <Route path='/streams/edit' component={StreamEdit}/>
                    <Route path='/streams/delete' component={StreamDelete}/>
                    <Route path='/streams/show' component={StreamShow}/> 
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;