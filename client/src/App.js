import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './pages/Main/Main';
import Authorization from './pages/Authorization/Authorization';
import Dashboard from './pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthorize, userRole } = useSelector(state => state.user);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth" element={<Authorization />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
