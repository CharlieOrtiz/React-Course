import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsAndUsers} from '../actions/index';
import UserHeader from './UserHeader';

class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchPostsAndUsers()
    }

    renderList() {
         return this.props.posts.map((post) => (
             <div className='item' key={post.id}>
                 <i className='large middle aligned icon user'></i>
                 <div className='content'>
                    <div className='description'>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                    <UserHeader userId={post.userId} />
                 </div>
             </div>
         ))
    }

    render() {
        return <div className='ui relaxed divided list'>
            {this.renderList()}
        </div>
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
};

export default connect(
    mapStateToProps, 
    {fetchPostsAndUsers} //mapDispatchToProps; remember this function return an object with some properties equal to action creators, here we're having an object equal to this {fetchPost: fetchPost} but cause property and value are written equal we can use ES6 shorthand and omit the property.
)(PostList);