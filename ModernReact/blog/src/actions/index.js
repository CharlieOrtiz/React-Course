import jsonPlaceHolder from '../api/jsonPlaceHolder';

//fetchPosts returns an async function, and this one is read by the redux-thunk middleware to accept it even though is a function and not an action object.
export const fetchPosts = () => async (dispatch) => {
        const response = await jsonPlaceHolder.get('/posts');
        
        dispatch({
            type: 'FETCH_POSTS',
            payload: response,
        })
};