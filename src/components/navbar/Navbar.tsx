import './navbar.css';
import { NavLink } from 'react-router-dom';
import Search from '../search/Search';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Video Archives</h2>
      <ul className="navbar_link-list">
        <NavLink to="/video-archives/" className="link-list_link">
          <li>Home</li>
        </NavLink>
        <NavLink to="/video-archives/categories" className="link-list_link">
          <li>Categories</li>
        </NavLink>
        <NavLink to="/video-archives/bookmarks" className="link-list_link">
          <li>Bookmarks</li>
        </NavLink>
      </ul>
      <Search />
    </nav>
  );
}
