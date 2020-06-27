import jsonPlaceHolder from '../api/jsonPlaceHolder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    let uniqueUser;
    const users = getState().posts.filter((user) => {
       if(user.userId !== uniqueUser) {
           uniqueUser = user.userId;
           return user.userId === uniqueUser;
       }
    });
    users.forEach((user) => {
        dispatch(fetchUser(user.userId));
    })
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