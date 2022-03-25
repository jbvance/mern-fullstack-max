import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      <li>
        {authCtx.isLoggedIn && (
          <NavLink to={`/${authCtx.userId}/places`}>My Places</NavLink>
        )}
      </li>
      <li>
        {authCtx.isLoggedIn && <NavLink to="/places/new">Add Place</NavLink>}
      </li>
      <li>
        {!authCtx.isLoggedIn && <NavLink to="/auth">Authenticate</NavLink>}
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
