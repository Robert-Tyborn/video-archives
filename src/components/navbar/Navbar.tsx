import './navbar.css';
import { NavLink } from 'react-router-dom';

export default function () {
  return (
    <nav>
      <ul>
        <li className="logo">Video Archives</li>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/">
          <li>Categories</li>
        </NavLink>
        <NavLink to="/">
          <li>Bookmarks</li>
        </NavLink>
      </ul>
    </nav>
  );
}
