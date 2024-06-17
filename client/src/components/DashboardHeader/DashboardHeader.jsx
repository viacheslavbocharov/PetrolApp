import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';


const DashboardHeader = () => {
  
  const { user, userRole } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    dispatch(signout());
    navigate('/');
  };

return (
  <header>
    <div>{user.name} {user.surname}</div>
    <div></div>
    <div>Logged as: {userRole}</div>
    <button onClick={handleSignOut}>Sign Out</button>
  </header>
);

};

export default DashboardHeader;
