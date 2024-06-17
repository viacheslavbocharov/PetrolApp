import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom'; // Необходимо импортировать useNavigate

const RoleForm = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Инициализация useNavigate

  const handleRoleClick = (role) => {
    dispatch(setUserRole(role));
    navigate('/dashboard');
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {user.role.map(role => (
        <button key={role} onClick={() => handleRoleClick(role)}>{capitalize(role)}</button>
      ))}
    </div>
  );
};

export default RoleForm;
