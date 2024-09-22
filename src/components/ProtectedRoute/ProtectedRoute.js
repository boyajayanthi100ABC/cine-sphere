import { BottomNavigation } from '@mui/material';
import Cookie from 'js-cookie'
import { Navigate, Route } from 'react-router-dom'
import SimpleBottomNavigation from '../MainNav';
import Header from '../Header/Header';

const ProtectedRoute = props => {
    const Component = props.element;

  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />;
  }
//   return <Route {...props} />
return <div style={{ minWidth: '100vw'}}> 
<Header />
<Component />
<SimpleBottomNavigation />
</ div>;

}

export default ProtectedRoute