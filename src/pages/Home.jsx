import { Link } from "react-router-dom";
import { coursesData } from "../data/courses";
import Card from "../components/Card";
import "../styles/Home.css";

function Home() {
  const featured = coursesData.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Білімге жол ашамыз</h1>
          <p className="hero-subtitle">Ең үздік онлайн курстар платформасы</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn-primary">Курстарды қарау</Link>
            <Link to="/register" className="btn-outline">Тіркелу</Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Курстар</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">12 000+</span>
          <span className="stat-label">Студенттер</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Қанағат</span>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Танымал курстар</h2>
        <div className="cards-grid">
          {featured.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              description={course.description}
              category={course.category}
              rating={course.rating}
              linkTo={`/courses/${course.id}`}
            />
          ))}
        </div>
        <div className="view-all">
          <Link to="/courses" className="btn-primary">Барлық курстар</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
