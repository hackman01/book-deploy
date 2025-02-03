import React, { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,

  Grid,
  Card,
  CardContent,

  Typography,
  TextField,

  InputAdornment,

  FormControl,

  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useSearchBooks from '../../hooks/useSearchBooks';
import useLikeBook from '../../hooks/useLikeBook';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../state/authSlice';


export default function BookDiscovery() {
  const [titleFilter, setTitleFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const auth = useSelector(state=>state.auth);
  const [favorites, setFavorites] = useState(auth.user.favorites)
  const { searchBooks, books, loading } = useSearchBooks();
  const { likeBook, lloading } = useLikeBook();
  const likingBook = useRef()
  const dispatch = useDispatch();

  const handleFavorite = (bookId) => {
     likingBook.current = bookId;
     likeBook({favorites,bookId,setFavorites});

  };



  const handleSearch = async ()=>{
     
      await searchBooks({title:titleFilter,genre:genreFilter, author:authorFilter });

  }
 
  useEffect(()=>{
    const user = {...auth.user, favorites};
    dispatch(loginSuccess(user));
   localStorage.setItem('user',JSON.stringify(user));
  },[favorites])


  return (

    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search Books"
            variant="outlined"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
       
          <TextField
            fullWidth
            label="Genre"
            variant="outlined"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          />
         
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Author"
            variant="outlined"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              sx={{ padding: 1.8 }}
              disabled={loading}
            >
              <span>Search</span>
            </Button>
          </FormControl>
        </Grid>
      </Grid>


      <Grid container spacing={3}>
        
        {loading ? <div className='pt-4 flex w-full justify-center' ><CircularProgress size={25} color='secondary' /></div> : books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {book.title}
                  </Typography>
                  <IconButton
                    onClick={() => handleFavorite(book._id)}
                    color="primary"
                    size="small"
                  >
                    {(lloading && likingBook.current===book._id) ? <FavoriteIcon /> : favorites?.includes(book._id.toString()) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {book.genre}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>

  );
}