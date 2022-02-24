import "./SideBar.scss";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function Sidebar() {
  const [setToken] = useAuth();

  const handleLogout = () => {
    setToken(false);
  };
  return (
    <div className="Sidebar">
      <ul className="navlist">
        <li className="navlist__item">
          <NavLink
            to="/embassies"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Embassies</p>
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to="/categories"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Categories</p>
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to="/objects"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Objects</p>
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to="/gits"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Gits</p>
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to="/hotels"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Hotels</p>
          </NavLink>
        </li>

        <li className="navlist__item">
          <NavLink
            to="/restaurants"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Restaurants</p>
          </NavLink>
        </li>

        <li className="navlist__item">
          <NavLink
            to="/transports"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Transports</p>
          </NavLink>
        </li>
        <li className="navlist__item">
          <NavLink
            to="/users"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text">Users</p>
          </NavLink>
        </li>

        <li className="navlist__item">
          <NavLink
            to="/login"
            className="navlink"
            activeClassName="active-navlink"
          >
            <p className="navlist__item__text" onClick={handleLogout}>
              Log out
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
