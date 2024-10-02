import './navbar.css';
import { NavLink } from 'react-router-dom';
import Search from '../search/Search';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li className="logo">Video Archives</li>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/categories">
          <li>Categories</li>
        </NavLink>
        <NavLink to="/">
          <li>Bookmarks</li>
        </NavLink>
      </ul>
      <Search />
    </nav>
  );
}
