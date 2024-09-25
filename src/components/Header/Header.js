import { Box, Button, IconButton, Menu, MenuItem, Modal, Typography, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import './Header.css';
import Cookie from 'js-cookie';
import Cookies from "js-cookie";

const Header = ({ setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [isProfileChange, setIsProfileChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsProfileChange(false); 
  };

  // Help Modal handling
  const handleHelpOpen = () => {
    setOpenModal(true);
    handleMenuClose();
  };
  const handleHelpClose = () => {
    setOpenModal(false);
  };

  // Signout handler
  const handleSignOut = () => {
     Cookie.remove('jwt_token');
     localStorage.removeItem('currentPage');
     navigate('/'); 
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); 
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeProfilePicClick = () => {
    document.getElementById("profile-pic-input").click();
  };

  const handleProfileChange = () => {
    setIsProfileChange(true);
  };


  const renderAvatar = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let width = 60;
    if(windowWidth <= 768){
      width = 40;
    }else if(windowWidth <= 1023){
      width = 50;
    }


    return (
      <Avatar
              alt="Profile Picture"
              src={profilePic}
              sx={{ width: width, height: width, marginTop: '5px'}} 
            />
    )
  }


  return (
    <div className="header-container">
      <div className="header">
        <span onClick={() => window.scroll(0, 0)}>
          {/* 🎬 Entertainment Hub 🎥 */}
           <img src="https://res.cloudinary.com/dowxe4qdv/image/upload/v1727283235/cine-sphere_pro/film-roll_17842769_jrtsfu.gif" className="gif-styles" /> <span style={{alignSelf: 'center'}}> Cine-Sphere </span>
        </span>

        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          className="account-icon"
          sx={{ color: 'black' }}
        >
          {profilePic ? (
            renderAvatar()
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </IconButton>

        <input
          type="file"
          accept="image/*"
          id="profile-pic-input"
          style={{ display: "none" }}
          onChange={handleProfilePicChange}
        />
      </div>


      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {isProfileChange ? (
          <>
            <MenuItem onClick={handleChangeProfilePicClick}>Change Profile Picture</MenuItem>
            <MenuItem onClick={() => setIsProfileChange(false)}>Cancel</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleHelpOpen}>Help</MenuItem>
            <MenuItem onClick={handleProfileChange}>Profile Change</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </>
        )}
      </Menu>

      <Modal open={openModal} onClose={handleHelpClose}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" component="h2">
            Help & Support
          </Typography>
          <Typography sx={{ mt: 2 }}>
            For assistance, kindly contact support@entertainmenthub.com or call 1-800-123-4567.
          </Typography>
          <Button onClick={handleHelpClose} sx={{ mt: 2 }} variant="outlined">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



// import "./Header.css";
// import { useState } from "react";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import './Header.css';
// import { useNavigate } from "react-router-dom";
 
// const Header = ({ setIsAuthenticated }) => {


//     return(
//         <div>
//             <span className="header" onClick={() => window.scroll(0,0)}>  🎬 Entertainment Hub 🎥 </span>
//         </div>
//     )
// }


// export default Header