import { useRef, useState, useEffect } from 'react';
import { createTheme, ThemeProvider, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
// import axios from './api/axios';
import applicationConfiguration from '../../../components/assets/json/application-configuration.json'
import Cookie from 'js-cookie';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#ffffff' },
      background: { default: '#121212' }
    }
  });
  



const Login = () => {
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const validCredentials = applicationConfiguration.Credentials;
        if (user === validCredentials.username && pwd === validCredentials.password) {

          Cookie.set("jwt_token", applicationConfiguration.JWT_Token, {expires: 1});

         
          setUser('');
          setPwd('');
        } else {
          setErrMsg('Invalid username or password');
          setOpen(true);
        }
      } catch (err) {
        setErrMsg('Login Failed');
        errRef.current.focus();
        setOpen(true);
      }
    };
  
    const handleClose = () => setOpen(false);
  
    return (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: 300 }}>
            <Typography variant="h4" color="primary">Sign In</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <Button type="submit" fullWidth variant="contained" color="primary">Sign In</Button>
            </form>
            <Typography ref={errRef} color="error" aria-live="assertive">{errMsg}</Typography>
            <Typography variant="body2">Need an Account? <a href="#">Sign Up</a></Typography>
          </Box>
  
          {/* Snackbar for error */}
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errMsg}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default Login;
  


//   const Login = ({ setIsAuthenticated }) => {
//     //   const userRef = useRef();
//       const errRef = useRef();
    
//       const [user, setUser] = useState('');
//       const [pwd, setPwd] = useState('');
//       const [errMsg, setErrMsg] = useState('');
//       const [success, setSuccess] = useState(false);
//       const [open, setOpen] = useState(false);
    
//       useEffect(() => {
//         // userRef.current.focus();
//       }, []);
    
//       useEffect(() => {
//         setErrMsg('');
//       }, [user, pwd]);
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//           // Fetch credentials from the JSON file
//         //   const response = await axios.get('/credentials.json');
//           const validCredentials = applicationConfiguration.Credentials;
//         //   {
//         //     "username": "correctUser",
//         //     "password": "correctPassword"
//         //   };
    
//           if (user === validCredentials.username && pwd === validCredentials.password) {
//             setSuccess(true);
//             setUser('');
//             setPwd('');
//             setIsAuthenticated(true);
//           } else {
//             setErrMsg('Invalid username or password');
//             setOpen(true);
//           }
//         } catch (err) {
//           setErrMsg('Login Failed');
//           errRef.current.focus();
//           setOpen(true);
//         }
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };
    
//       return (
//         <ThemeProvider theme={darkTheme}>
//           <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             {success ? (
//               <Typography variant="h5" color="success">You are successfully logged in!</Typography>
//             ) : (
//               <Box sx={{ width: 300 }}>
//                 <Typography variant="h4" color="primary">Sign In</Typography>
//                 <form onSubmit={handleSubmit}>
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     label="Username"
//                     // inputRef={userRef}
//                     onChange={(e) => setUser(e.target.value)}
//                     value={user}
//                     required
//                   />
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     type="password"
//                     label="Password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                   />
//                   <Button type="submit" fullWidth variant="contained" color="primary">Sign In</Button>
//                 </form>
//                 <Typography ref={errRef} color="error" aria-live="assertive">
//                   {errMsg}
//                 </Typography>
//                 <Typography variant="body2">
//                   Need an Account? <a href="#">Sign Up</a>
//                 </Typography>
//               </Box>
//             )}
    
//             {/* Snackbar for error */}
//             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//               <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//                 {errMsg}
//               </Alert>
//             </Snackbar>
//           </Box>
//         </ThemeProvider>
//       );
//     };
    
//     export default Login;