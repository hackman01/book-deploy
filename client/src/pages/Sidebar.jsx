import React, { useState } from 'react';
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,

} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import AvatarMenu from '../components/AvatarMenu';
import Books from '../components/BookList/BookList';
import BookDiscovery from '../components/BookDiscovery/BookDiscovery';
import { useSelector } from 'react-redux';
import BookMatching from '../components/Matching/BookMatching';
import Requests from '../components/Request/Request';

const drawerWidth = 240;

export default function SidebarLayout() {
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const auth = useSelector(state=>state.auth);

  const menuItems = [
    { text: 'Book List', icon: ListIcon, component: Books },
    { text: 'Book Discovery', icon: SearchIcon, component: BookDiscovery },
    { text: 'Matches', icon: JoinFullIcon, component: BookMatching },
    { text: 'Requests', icon: RequestPageIcon, component: Requests},
  ];

  const getContent = (index) => {
    const ActiveComponent = menuItems[index].component
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {menuItems[index].text}
          </Typography>
          <ActiveComponent />
        </Paper>
      </Container>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
         
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome to your book collection, {auth.user.name} !
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <AvatarMenu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: 0,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }),
          ...(!open && {
            '& .MuiDrawer-paper': {
              width: theme => theme.spacing(7),
              transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              overflowX: 'hidden',
            },
          }),
        }}  
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        
        <List sx={{ mt: 2 }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <ListItem
                button
                key={item.text}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedIndex === index ? 'primary.main' : 'inherit'
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: open ? 'block' : 'none',
                    '& .MuiTypography-root': {
                      fontWeight: selectedIndex === index ? 600 : 400,
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `100%`,
          ml: open ? `${drawerWidth}px` : theme => theme.spacing(7),
          mt: '64px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {getContent(selectedIndex)}
      </Box>
    </Box>
  );
}