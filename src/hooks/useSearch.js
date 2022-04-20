import axios from 'axios';


export const searchSongs = async (searchQuery) => {
   const { data } = await axios.get(`https://itunes.apple.com/search?term=${searchQuery}`);
   return data;
}
