import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './Header.css';
import { useTheme } from '../context/ThemeContext';

const Header = () => {

  const { theme, setTheme } = useTheme();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <h1>My Blog</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>

          {user ? (
            <>
              <span className="user-welcome">Hello, {user.name || 'User'}</span>
              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="nav-button theme-toggle"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
