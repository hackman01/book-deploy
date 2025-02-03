import React, { useState,useEffect } from 'react';
import { 

  Grid, 
  Container,
  CircularProgress
} from '@mui/material';

import useMatchingBooks from '../../hooks/useMatchingBooks';
import BookCard from './BookCard';






const BookMatching = () => {
  
  
  const { fetchMatchingBooks, loading, books } = useMatchingBooks();
  
  

  useEffect(()=>{
    fetchMatchingBooks()
  },[])

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {loading ? <div className='w-full flex justify-center' ><CircularProgress size={23} color='secondary' /></div> : books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookMatching;