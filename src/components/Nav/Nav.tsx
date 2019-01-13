import React from 'react';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';
import { AuthContext } from '../../lib/AuthContext';

interface NavProps extends RouteComponentProps<any> {}

class Nav extends React.Component<NavProps> {
  public static contextType = AuthContext;
  public render() {
    return (
      <div className="Navbar">
        {this.context.isAuthenticated() && (
          <span id="loggedInUser">
            Logged in as: {this.context.getProfile()!.name}
          </span>
        )}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        {this.context.isAuthenticated() && (
          <NavLink id="logout-link" to="/logout">
            Logout
          </NavLink>
        )}
        {!this.context.isAuthenticated() && (
          <NavLink id="login-link" to="/login">
            Login
          </NavLink>
        )}
      </div>
    );
  }
}

const NavWithRouter = withRouter(Nav);
delete NavWithRouter.contextType;
export default NavWithRouter;
