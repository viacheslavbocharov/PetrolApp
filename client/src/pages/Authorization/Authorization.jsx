import React from 'react';
import RoleForm from '../../components/RoleForm/RoleForm';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const isAuthorize = useSelector(state => state.user.isAuthorize);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(signout());
    navigate('/');
  };

  return (
    <>
      <button onClick={handleBack}>Back</button>
      {isAuthorize ? <RoleForm /> : <AuthorizationForm />}
    </>
  );
};

export default Authorization;
