import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';
import { withAuth, AuthProps } from '../../lib/with-auth';

class Nav extends React.Component<AuthProps> {
  public render() {
    const { auth } = this.props;
    const profile = auth.getProfile();
    return (
      <div className="navbar">
        {auth.isAuthenticated() && profile && (
          <span id="loggedInUser">Logged in as: {profile.name}</span>
        )}
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        {auth.isAuthenticated() && (
          <Link id="logout-link" to="/logout">
            Logout
          </Link>
        )}
        {!auth.isAuthenticated() && (
          <Link id="login-link" to="/login">
            Login
          </Link>
        )}
      </div>
    );
  }
}

export default withAuth(Nav);
