import { NavLink } from "react-router-dom";
import s from "../Navigation/Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  function getClassActiveLink({ isActive }) {
    return clsx(s.link, isActive && s.active);
  }

  return (
    <>
      <nav>
        <ul className={s.navWrap}>
          <li>
            <NavLink to="/" className={getClassActiveLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getClassActiveLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}