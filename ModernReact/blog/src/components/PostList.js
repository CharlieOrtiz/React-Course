import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';

class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        return <div>PostList</div>
    }
};

export default connect(
    null, 
    {fetchPosts} //mapDispatchToProps; remember this function return an object with some properties equal to action creators, here we're having an object equal to this {fetchPost: fetchPost} but cause property and value are written equal we can use ES6 shorthand and omit the property.
)(PostList);