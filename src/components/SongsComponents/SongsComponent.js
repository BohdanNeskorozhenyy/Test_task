import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import './index.css'

import Paper from '@mui/material/Paper';

import { useArrayRotate } from '../../hooks/useArrayrotate';
import { searchSongs } from '../../hooks/useSearch';
import { useQuery } from 'react-query'



const mockData = ['A', 'B', 'C', 'D', 'E']


function SongsComponent() {
   const [songs, setSongs] = useState(mockData);
   const [newSongs, setNewSongs] = useState([]);
   const [searchValue, setSearchValue] = useState('');

   const { arrayRotate } = useArrayRotate(songs, newSongs);
   const { data: requestResult, refetch, isSuccess } = useQuery('getSongs', () => searchSongs(searchValue));


   const getSongs = () => {
      if (searchValue) {
         refetch();
      }
   }

   const inputHandler = (e) => {
      setSearchValue(e.target.value)
   }

   useEffect(() => {
      const timeout = setTimeout(() => {
         setSongs(arrayRotate(songs, newSongs))
      }, 1000)
      return () => {
         clearTimeout(timeout)
      }
   })

   useEffect(() => {
      if (isSuccess) {
         const { results } = requestResult.data;
         const AllCollections = results.map(song => song.collectionName)
         const noRepeatCollections = [...new Set(AllCollections)]
         if (songs) {
            setNewSongs(noRepeatCollections.filter((song, i) => i <= 4))
         } else {
            setSongs(noRepeatCollections.filter((song, i) => i <= 4))
         }
      }
   }, [requestResult])



   return (
      <Container sx={containerStyles}>
         <Box sx={inputBoxStyle}>
            <TextField onChange={inputHandler} value={searchValue} sx={searchStyles} placeholder='Search Band' />
         </Box>
         <Box sx={boxStyles}>
            {songs.map((song, i) => (
               <Item className={`song-item${i} song-item`} key={i}>{song}</Item>
            ))}
         </Box>
         <Button variant='contained' onClick={() => getSongs()}>search</Button>
      </Container >
   );
}




const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: "#168aad",
   ...theme.typography.body2,
   padding: theme.spacing(2),
   margin: '15px 0px',
   textAlign: 'center',
   color: '#ffffff',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis',
   overflow: 'hidden',
   boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px;'
}));


const containerStyles = {
   maxWidth: '100%',
   width: '540px',
   padding: '15px',
}

const boxStyles = {
   perspective: '400px',
   marginTop: '20px',
   width: "100%",
   padding: '30px',
   boxSizing: 'border-box',
   borderRadius: '10px',
   background: "#ffffff",
   boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
}
const inputBoxStyle = {
   width: "100%",
   padding: '10px',
   boxSizing: 'border-box',
   borderRadius: '10px',
   background: "#ffffff",
   boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
}

const searchStyles = {
   width: '100%',
}


export default SongsComponent;
