import { BottomNavigation } from '@mui/material';
import Cookie from 'js-cookie'
import { Navigate, Route } from 'react-router-dom'
import SimpleBottomNavigation from '../MainNav';
import Header from '../Header/Header';
import './Protectedroute.css';

const ProtectedRoute = props => {
    const Component = props.element;
    console.log("Componenet", Component)

  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />;
  }
//   return <Route {...props} />
return <div className="protected-route-div"> 
<Header />
<Component />
<SimpleBottomNavigation />
</ div>;

}

export default ProtectedRoute