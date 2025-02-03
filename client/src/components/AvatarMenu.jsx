import React, { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../state/authSlice";

const AvatarMenu = () => {


  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear()
    handleClose();
  }

  return (
    <div>
    
      <IconButton onClick={handleClick}>
        <Avatar src="" alt="User Avatar" />
      </IconButton>

     
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
