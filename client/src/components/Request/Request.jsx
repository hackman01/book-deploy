import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Grid,
    Container,
    useScrollTrigger,
    CircularProgress,
    Button
} from '@mui/material';
import {
    Book as BookIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import useFetchRequests from '../../hooks/useFetchRequests';
import useExchange from '../../hooks/useExchange';

const StatusChip = styled(Chip)(({ status }) => {
    const colors = {
        pending: {
            bgcolor: '#fff3cd',
            color: '#856404',
        },
        accepted: {
            bgcolor: '#d4edda',
            color: '#155724',
        },
        rejected: {
            bgcolor: '#f8d7da',
            color: '#721c24',
        },
    };

    return {
        backgroundColor: colors[status]?.bgcolor || colors.pending.bgcolor,
        color: colors[status]?.color || colors.pending.color,
        fontWeight: 'bold',
        '& .MuiChip-label': {
            padding: '8px 12px',
        },
    };
});

const RequestCard = ({ request,requests,setRequests }) => {
    const getStatusLabel = (status) => {
        switch (status) {
            case 'accepted':
                return 'Accepted';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Pending';
        }
    };


    const user = useSelector(state => state.auth.user);
    const {exchange,loading} = useExchange();

  

    const handleExchange = ()=>{
         exchange({book_id : request.book_id._id, request_id : request._id,requests,setRequests});
    }

    return (
        <Card sx={{ width: '100%', mb: 2, boxShadow: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <BookIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="h6" component="h3">
                                {request.book_id.title}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PersonIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.2rem' }} />
                            <Typography variant="body2" color="text.secondary">
                                Owner: {request.to_id._id === user._id ? <span>Me</span> : <span>{request.to_id.name}</span>}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ScheduleIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.2rem' }} />
                            <Typography variant="body2" color="text.secondary">
                                Requested on: {new Date(request.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt:1 }}>
                        <PersonIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '1.2rem' }} />
                            <Typography variant="body2" color="text.secondary">
                                Requested by: {request.by_id._id === user._id ? <span>Me</span> : <span>{request.by_id.name}</span>}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: { xs: 'flex-start', sm: 'center' },
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <StatusChip
                                label={getStatusLabel(request.status)}
                                status={request.status}
                                sx={{ mb:2 }}
                                
                            />
                            {(request.to_id._id === user._id && request.status === "pending") ? <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleExchange}
                                disabled={loading}
                            >
                                <div className='h-max' >{loading ? <CircularProgress size={17} color='secondary' /> : <span>Exchange</span>}</div>
                            </Button> : null}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const Requests = () => {
    
    const { fetchRequests, requests, setRequests, loading } = useFetchRequests();

    useEffect(() => {
        fetchRequests();
    }, [])

    return (
        <Container sx={{ py: 4 }}>
            {loading ? <div className='w-full flex justify-center'><CircularProgress size={20} color='primary' /></div> : requests.map((request) => (
                <RequestCard key={request._id} request={request} requests={requests} setRequests={setRequests} />
            ))}
        </Container>
    );
};

export default Requests;