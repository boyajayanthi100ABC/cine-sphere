// import { Box, Button, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
// import { useState } from "react";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from "react-router-dom";
// import './Header.css';

// const Header = ({ setIsAuthenticated }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const navigate = useNavigate();
//   // firstName: any;

//   // Menu handling
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Help Modal handling
//   const handleHelpOpen = () => {
//     setOpenModal(true);
//     handleMenuClose();
//   };
//   const handleHelpClose = () => {
//     setOpenModal(false);
//   };

//   // Signout handler
//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     navigate('/'); // Redirect to the login page
//   };

//   return (
//     <div className="header-container">
//     <div className="header">
//         <div></div>
//       <span  onClick={() => window.scroll(0, 0)}>
//         🎬 Entertainment Hub 🎥 </span>
      

//       <IconButton
//         aria-label="account of current user"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={handleMenuOpen}
//         className="account-icon"
//         sx={{ color: 'black' }} // Make icon black
//       >
//         <AccountCircleIcon  fontSize="4vw"/>
//       </IconButton>


//       </div>

//       {/* Dropdown Menu */}
//       <Menu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleHelpOpen}>Help</MenuItem>
//         <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
//       </Menu>

//       {/* Help Modal */}
//       <Modal open={openModal} onClose={handleHelpClose}>
//         <Box sx={{ ...modalStyle }}>
//           <Typography variant="h6" component="h2">
//             Help & Support
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             For assistance, kindly contact to support@entertainmenthub.com or call 1-800-123-4567.
//           </Typography>
//           <Button onClick={handleHelpClose} sx={{ mt: 2 }} variant="outlined">
//             Close
//           </Button>
//           {/* <p> {firstName} </p> */}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default Header;

// // Modal box styling
// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };



import { Box, Button, IconButton, Menu, MenuItem, Modal, Typography, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import './Header.css';

const Header = ({ setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [isProfileChange, setIsProfileChange] = useState(false); // State to toggle profile change option
  const navigate = useNavigate();

  useEffect(() => {
    // Load the profile picture from localStorage on component mount
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // Menu handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsProfileChange(false); // Reset profile change state
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
    setIsAuthenticated(false);
    navigate('/'); // Redirect to the login page
  };

  // Handle file upload for profile picture
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Set the base64 image data as the profile picture
        localStorage.setItem("profilePic", reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input when clicking on the Change Profile Picture option
  const handleChangeProfilePicClick = () => {
    document.getElementById("profile-pic-input").click();
  };

  // Handle profile change option
  const handleProfileChange = () => {
    setIsProfileChange(true);
  };

  return (
    <div className="header-container">
      <div className="header">
        {/* <div></div> */}
        <span onClick={() => window.scroll(0, 0)}>
          🎬 Entertainment Hub 🎥
        </span>

        {/* Profile Picture Upload and Display */}
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          className="account-icon"
          sx={{ color: 'black' }}
        >
          {profilePic ? (
            <Avatar
              alt="Profile Picture"
              src={profilePic}
              sx={{ width: 40, height: 40 }} // Set width and height for the avatar
            />
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </IconButton>

        {/* Hidden file input for uploading profile picture */}
        <input
          type="file"
          accept="image/*"
          id="profile-pic-input"
          style={{ display: "none" }}
          onChange={handleProfilePicChange}
        />
      </div>

      {/* Dropdown Menu */}
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

      {/* Help Modal */}
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

// Modal box styling
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