import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-title">Бет табылмады</p>
      <p className="notfound-subtitle">Сіз іздеген бет жоқ немесе жойылған.</p>
      <Link to="/" className="btn-primary">Басты бетке оралу</Link>
    </div>
  );
}

export default NotFound;
