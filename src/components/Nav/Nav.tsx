import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../lib/AuthContext';
import './nav.scss';

class Nav extends React.Component {
  public static contextType = AuthContext;
  public render() {
    const profile = this.context.getProfile();
    return (
      <AuthContext.Consumer>
        {authContext => (
          <div className="navbar">
            {this.context.isAuthenticated() && profile && (
              <span id="loggedInUser">Logged in as: {profile.name}</span>
            )}
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
            {this.context.isAuthenticated() && (
              <Link id="logout-link" to="/logout">
                Logout
              </Link>
            )}
            {!this.context.isAuthenticated() && (
              <Link id="login-link" to="/login">
                Login
              </Link>
            )}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Nav;
