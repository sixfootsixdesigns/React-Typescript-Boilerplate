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
          <span>Logged in as: {profile.name}</span>
        )}
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        {auth.isAuthenticated() && <Link to="/logout">Logout</Link>}
        {!auth.isAuthenticated() && <Link to="/login">Login</Link>}
      </div>
    );
  }
}

export default withAuth(Nav);
