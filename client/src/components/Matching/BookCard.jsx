import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Box,
    CircularProgress
  } from '@mui/material';

import { useState } from 'react';

import { styled } from '@mui/material/styles';
import useSendRequest from '../../hooks/useSendRequest';



const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
  });


const BookCard = ({ book }) => {

    const { sendRequest, loading } = useSendRequest();
    const [requested,setRequested] = useState(false);

    const handleRequest = () => {
        
        
        sendRequest({userId:book.user_id,bookId:book._id,setRequested})

    }

    return <Card>
      <StyledCardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {book.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 'bold' }}></Box> {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 'bold' }}></Box> {book.genre}
        </Typography>
      </StyledCardContent>
      <CardActions>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleRequest}
          disabled={loading || requested}
        >
          <div className='h-max' >{loading ? <CircularProgress size={17} color='secondary' /> : <span>Send Request</span>}</div>
        </Button>
      </CardActions>
    </Card>
  };

  export default BookCard;