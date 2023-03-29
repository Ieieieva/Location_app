import { Outlet, NavLink } from "react-router-dom";
import "./Layout.scss";

export const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar__link">
          List
        </NavLink>

        <NavLink to="/map" className="navbar__link">
          Map
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
};
