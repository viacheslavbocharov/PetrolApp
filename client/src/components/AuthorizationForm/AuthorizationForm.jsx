import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../store/userSlice';

const AuthorizationForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector(state => state.user.errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ login, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="login" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Log In</button>
      {errors && <div>{errors}</div>}
    </form>
  );
};

export default AuthorizationForm;
