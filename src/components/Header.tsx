import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#FAFAFA', 
        color: 'black',
        boxShadow: 'none', 
        borderBottom: '1px solid #e0e0e0',
        height:'60px'
      }}
    >
      <Toolbar sx={{minHeight: '60px'}}>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;