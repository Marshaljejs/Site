import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          EduPlatform
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Басты бет
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Курстар
          </NavLink>
          {user && (
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Профиль
            </NavLink>
          )}
        </nav>
        <div className="header-auth">
          {user ? (
            <div className="header-user">
              <span className="user-email">{user.email}</span>
              <button className="btn-logout" onClick={logout}>Шығу</button>
            </div>
          ) : (
            <div className="header-auth-links">
              <NavLink to="/login" className="btn-login">Кіру</NavLink>
              <NavLink to="/register" className="btn-register">Тіркелу</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
