import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/auth">Sign In</Link>
  </header>
);

export default Header;