import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {

  const [value, setValue] = React.useState(() => {
    return parseInt(localStorage.getItem('currentPage') || '0', 10);
  });

  const navigate = useNavigate();


  useEffect(() => {
    localStorage.setItem('currentPage', value);
  }, [value]);

    useEffect(() => {
        if(value === 0) navigate("/trending");
        else if(value === 1) navigate("/movies");
        else if(value === 2) navigate("/series");
        else if(value === 3) navigate("/search");
    }, [value, navigate]);

  return (
    <Box sx={{  width: "100vw",
    position: "fixed", 
    bottom: 0, 
    backgroundColor: "#2d313a",
    zIndex: 100, }}>
      <BottomNavigation
      className="custom-bottom-navigation"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color: "White", boxShadow: value === 0 ? "0px 1px 8px rgba(255,255,255,0.5)" : "none", }} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color: "White", boxShadow: value === 1 ? "0px 1px 8px rgba(255,255,255,0.5)" : "none", }} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color: "White", boxShadow: value === 2 ? "0px 1px 8px rgba(255,255,255,0.5)" : "none", }}label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color: "White", boxShadow: value === 3 ? "0px 1px 8px rgba(255,255,255,0.5)" : "none", }}label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}