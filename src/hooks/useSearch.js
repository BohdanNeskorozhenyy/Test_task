import axios from 'axios';


export const searchSongs = (searchQuery) => {
   return axios.get(`https://itunes.apple.com/search?term=${searchQuery}`);
}
