import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../lib/AuthContext';
import './nav.scss';

export const Nav = () => {
  const context = useContext(AuthContext);
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      {context.isAuthenticated && <Link to="/logout">Logout</Link>}
      {!context.isAuthenticated && <Link to="/login">Login</Link>}
    </div>
  );
};
