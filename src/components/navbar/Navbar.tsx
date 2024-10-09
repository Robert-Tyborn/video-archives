import './navbar.css';
import { NavLink } from 'react-router-dom';
import Search from '../search/Search';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li className="logo">Video Archives</li>
        <NavLink to="/video-archives/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/video-archives/categories">
          <li>Categories</li>
        </NavLink>
        <NavLink to="/video-archives/bookmarks">
          <li>Bookmarks</li>
        </NavLink>
      </ul>
      <Search />
    </nav>
  );
}
