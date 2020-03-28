import axios from 'axios';

//We can create a new instance of axios with a custom config, then we can use the get or any http method to merge with the instance config
export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID gSG2SAocIKmdKe-B0YbUbUW_TOgD7SFidbQYEMjSILs'
    }
});