import './App.css';
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { searchSongs } from './hooks/useSearch';


const mockData = [
  { collectionName: 'A' },
  { collectionName: 'B' },
  { collectionName: 'C' },
  { collectionName: 'D' },
  { collectionName: 'E' }
]


function App() {
  const [songs, setSongs] = useState(mockData);
  const [searchValue, setSearchValue] = useState('')
  const [newSongs, setNewSongs] = useState([])
  const [counter, setCounter] = useState(0)


  const getSongs = (searchKey) => {
    searchSongs(searchKey || '').then(res => setNewSongs(res.results.filter((song, i) => {
      if (i <= 5) {
        return song
      }
    })))
  }

  
  const inputHandler = (e) => {
    setSearchValue(e.target.value)
    setCounter(0);
    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      getSongs(searchValue)
    }, 2000);

  }


  function arrayRotate(arr) {
    if (newSongs.length > 0 && counter <= 5 && searchValue.length > 0) {
      const newArr = [...arr];
      newArr.shift();
      newArr.push(newSongs[counter])
      return [...newArr];
    }

    const newArr = [...arr];
    const firstEl = newArr[0];
    newArr.shift();
    newArr.push(firstEl)
    return [...newArr];


  }
  useEffect(() => {
    if (songs) {
      const timerId = setInterval(() => setSongs(songs => arrayRotate(songs)), 1000);
      return () => clearInterval(timerId);
    }
  });

  useEffect(() => {
    if (searchValue.length > 0) {
      const timerCounterId = setInterval(() => setCounter(counter => ++counter), 1000);
      return () => clearInterval(timerCounterId);
    }
  })

  // useEffect(() => {
  //   window.event.data && searchValue.length > 0 && getSongs(searchValue)
  // }, [searchValue])

  return (
    <div className="App">
      <Container sx={containerStyles}>
        <Box sx={inputBoxStyle}>
          <TextField onChange={(e) => inputHandler(e)} value={searchValue} sx={searchStyles} placeholder='Search Band' />
        </Box>
        <Box sx={boxStyles}>
          <Stack spacing={2}>
            {songs.map((song, i) => <Item key={i}>{song?.collectionName}</Item>)}
          </Stack>
        </Box>
      </Container>
    </div>
  );
}



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#168aad",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#ffffff',
}));

const containerStyles = {
  maxWidth: '100%',
  width: '540px',
  padding: '15px',
}

const boxStyles = {
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


export default App;
