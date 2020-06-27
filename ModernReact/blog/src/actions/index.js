import jsonPlaceHolder from '../api/jsonPlaceHolder';
import _ from 'lodash';

//fetchPostsAndUsers is the only function dispatched by our components, this function returns an async function and inside our store our Middleware sees that our dispatch  has a function, instead of an object, so invokes that function with two arguments: dispatch and getSate. In this way we run our async function and do some dispatches inside of it, those dispatches has a function again and repeat the same process until we innvoke a dispatch with an object inside of it
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    const userIds = _.uniq(_.map(getState().posts, 'userId')); //Here we make used of our lodash library:
    //.uniq receives an array as argument and try to return a different array without repeating values
    //.map receives an array as the first argument and a second argument to know what we're going to return to be equal to every element inside that array. In this case the posts array has objects and in our second argument we write 'UserId' to return just the values of that object property
    userIds.forEach((id) => dispatch(fetchUser(id)));
}

//fetchPosts returns an async function, and this one is read by the redux-thunk middleware to accept it even though is a function and not an action object.
export const fetchPosts = () => async (dispatch) => {
        const response = await jsonPlaceHolder.get('/posts');
        
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data,
        })
}; 

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};