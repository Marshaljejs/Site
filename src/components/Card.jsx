import { Link } from "react-router-dom";
import "../styles/Card.css";

function Card({ title, description, category, rating, linkTo, onAdd }) {
  return (
    <div className="card">
      <div className="card-badge">{category}</div>
      <h4 className="card-title">{title}</h4>
      <p className="card-desc">{description}</p>
      <div className="card-footer">
        <span className="card-rating">Рейтинг: {rating}</span>
        {linkTo ? (
          <Link to={linkTo} className="btn btn-secondary">Қарау</Link>
        ) : (
          <button className="btn btn-secondary" onClick={onAdd}>Себетке қос</button>
        )}
      </div>
    </div>
  );
}

export default Card;
