import './navbar.css';
import { NavLink } from 'react-router-dom';
import Search from '../search/Search';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Video Archives</h1>
      <ul className="navbar_link-list">
        <NavLink
          to="/video-archives/"
          end
          className={({ isActive }) =>
            isActive ? 'active link-list_link' : 'link-list_link'
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/video-archives/categories"
          className={({ isActive }) =>
            isActive ? 'active link-list_link' : 'link-list_link'
          }
        >
          <li>Categories</li>
        </NavLink>
        <NavLink
          to="/video-archives/bookmarks"
          className={({ isActive }) =>
            isActive ? 'active link-list_link' : 'link-list_link'
          }
        >
          <li>Bookmarks</li>
        </NavLink>
      </ul>
      <Search />
    </nav>
  );
}
