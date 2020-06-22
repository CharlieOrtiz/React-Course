import jsonPlaceHolder from '../api/jsonPlaceHolder';

export default async function fetchPosts() {
    //This is bad approach
    const response = await jsonPlaceHolder.get('/posts'); //We can not have async-await functions in an action creator, this code is ES2017 and when we run it in our browser this one transpile it to ES2015 resulting a different returning from what we have here. Action creators should stricty return action objects!
    return {
        type: 'FETCH_POST',
        payload: response,
    }
}