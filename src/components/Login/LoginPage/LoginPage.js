import { useRef, useState, useEffect } from 'react';
import { createTheme, ThemeProvider, TextField, Button, Typography, Box, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import applicationConfiguration from '../../../components/assets/json/application-configuration.json'
import Cookie from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

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
    const [showPassword, setShowPassword] = useState(false); 
    const [errMsg, setErrMsg] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  

    useEffect(() => {
      const { username, password } = applicationConfiguration.Credentials;
      setUser(username);
      setPwd(password);
    }, []);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const validCredentials = applicationConfiguration.Credentials;
        if (user === validCredentials.username && pwd === validCredentials.password) {

          Cookie.set("jwt_token", applicationConfiguration.JWT_Token, {expires: 1});
          navigate("/trending");

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
    <div className="app-div"  style={{ paddingBottom: '0px' }}>
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
                type={showPassword ? 'text' : 'password'} // toggle input type between text and password
                label="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


              <Button type="submit" fullWidth variant="contained" color="primary">Sign In</Button>
            </form>
            <Typography ref={errRef} color="error" aria-live="assertive">{errMsg}</Typography>
            <Typography variant="body2">Need an Account? <a href="#">Sign Up</a></Typography>
          </Box>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errMsg}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
      </div>
    );
  };
  
  export default Login;
  